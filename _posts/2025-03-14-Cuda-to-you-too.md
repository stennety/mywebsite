---
layout: post
title: Cuda to You Too
---

If I'm doing some vector stuff, when is a GPU faster than a CPU? Remember, in order to perform computations on data on a GPU, that data first has to get onto that GPU.

### Vector Addition Warmup
Let's start with our own simplest possible vector addition for our first test.

Our CUDA code ...
```c
__global__ void add(double *a, double *b, double *c) {
    int i = blockDim.x * blockIdx.x + threadIdx.x;
    c[i] = a[i] + b[i];
    return;
}

extern "C" void vecadd(double *a, double *b, double *c, int n) {
    size_t bytes = n * sizeof(double);
    double *d_a, *d_b, *d_c;
    cudaMalloc(&d_a, bytes);
    cudaMalloc(&d_b, bytes);
    cudaMalloc(&d_c, bytes);

    cudaMemcpy(d_a, a, bytes, cudaMemcpyHostToDevice);
    cudaMemcpy(d_b, b, bytes, cudaMemcpyHostToDevice);

    int thread_per_blk = 256;
    int blk_in_grd = ceil( float(n) / thread_per_blk );

    add<<< blk_in_grd, thread_per_blk >>>(d_a, d_b, d_c);

    cudaMemcpy(c, d_c, bytes, cudaMemcpyDeviceToHost);
    cudaFree(d_a);
    cudaFree(d_b);
    cudaFree(d_c);
    return;
}
```

We want to test this in Python. The cuda compiler, nvcc, assumes C++ code, but python expects a C interface. So even though we didn't use any C++ features beyond C in our code, we use `extern "C"` for the function declaration we intend to use in our python code.

We can compile into a shared library
```
nvcc --ptxas-options=-v --compiler-options '-fPIC' -o libmyalg.so \ --shared my-cuda-code.cu
```

We can create a stupid simple python module to load and use this in Python
```python
class Linalg:
    def __init__(self):
        pwd = os.getcwd()
        self.libalg = ctypes.cdll.LoadLibrary(pwd + '/libmyalg.so')
        self.libalg.vecadd.argtypes = [
            ctypes.POINTER(ctypes.c_double),
            ctypes.POINTER(ctypes.c_double),
            ctypes.POINTER(ctypes.c_double),
            ctypes.c_int
        ]
        return

    def vecadd(self, a, b):
        assert(len(a) == len(b))
        n = len(a)
        double_array_type = ctypes.c_double * n
        a = double_array_type(*a)
        b = double_array_type(*b)
        c = double_array_type(*[float(0) for i in range(n)])
        a_ptr = ctypes.cast(a, ctypes.POINTER(ctypes.c_double))
        b_ptr = ctypes.cast(b, ctypes.POINTER(ctypes.c_double))
        c_ptr = ctypes.cast(c, ctypes.POINTER(ctypes.c_double))
        self.libalg.vecadd(a_ptr, b_ptr, c_ptr, n)
        return [c_ptr[i] for i in range(n)]
```
Let's run some tests comparing with a CPU implementation
```python
from linalg import Linalg
from numpy.random import ranf
from numpy import ones
from time import time
import torch

RAND = True
TIMES = []
REPEATS = 10
L = Linalg()

def telemetry(f):
    def inner(*args, **kwargs):
        global TIMES
        start = time()
        result = f(*args, **kwargs)
        TIMES.append(
            time() - start
        )
        return result
    return inner

@telemetry
def gpu_add(a, b):
    return L.vecadd(a, b)

@telemetry
def cpu_add(a, b):
    assert(len(a) == len(b))
    return [a[i] + b[i] for i in range(len(a))]

@telemetry
def torch_add(a, b):
    a_t = torch.tensor(a, device="cuda")
    b_t = torch.tensor(b, device="cuda")
    c_t = a_t + b_t
    return c_t.cpu().tolist()

def get_stats():
    global TIMES
    total_time = 0
    for t in TIMES:
        total_time += t
    avg = total_time / len(TIMES)
    TIMES = []
    return avg



def main():
    sizes = [int(1e7) * (i + 1) for i in range(10)]

    for size in sizes:
        a = ranf(size).tolist() if RAND else ones(size).tolist()
        b = ranf(size).tolist() if RAND else ones(size).tolist()

        # Try GPU
        for _ in range(REPEATS):
            _ = gpu_add(a, b)

        gpu_avg = get_stats()

        # Try CPU
        for _ in range(REPEATS):
            _ = cpu_add(a, b)

        cpu_avg = get_stats()

        # Try Torch
        for _ in range(REPEATS):
            _ = torch_add(a, b)

        torch_avg = get_stats()

        print(f"Array Size: {size}\n\tGPU Time: {gpu_avg}\n\tCPU Time: {cpu_avg}\n\tTorch Time: {torch_avg}\n")

    return

if __name__ == "__main__":
    main()
```

Our results:
```
Array Size: 10000000
    GPU Time: 1.8718446969985962    
    CPU Time: 0.23455827236175536   
    Torch Time: 1.1580479621887207

Array Size: 20000000
    GPU Time: 3.7060280799865724
    CPU Time: 0.4659819364547729
    Torch Time: 2.30745325088501

Array Size: 30000000
    GPU Time: 5.530006408691406     
    CPU Time: 0.6950353622436524    
    Torch Time: 3.458830642700195
```

We are approximately an ORDER OF MAGNITUDE slower than the CPU!!! And it's not just that we wrote crappy code - PyTorch is faster than us (we'll explore why later), but PyTorch is still SIGNIFICANTLY slower than the CPU.

Data transfer is slow as shit.