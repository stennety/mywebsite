---
layout: post
title: Concurrency 4 - Buffered Channels and Worker Pools
tags: [golang, concurrency, goroutines, channel, buffered channnel, workder pools]
---

## Buffered channels là gì?

Tất cả channels chúng ta thảo luận ở bài trước đều là `unbuffered` channel. Gửi và nhận đata đều bị block trên những channel này.
Chúng ta có thể tạo ra a channel với a buffer. Gửi dữ liệu sẽ chỉ bị blocked khi bufer đầy. Tương tự, nhận dữ liệu chỉ bị block khi buffer trống.
Buffered channels có thể tạo bằng việc thêm paramter `capacity` ở `make` func.
```go
ch := make(chan type, capacity)
```
## Ví dụ về Buffered channels
```go
package main

import (
	"fmt"
)


func main() {
	ch := make(chan string, 2)
	ch <- "naveen"
	ch <- "paul"
	fmt.Println(<- ch)
	fmt.Println(<- ch)
}
```
Trong chương trình này, chúng ta tạo một channel với buffered là 2. Vì vậy nó có khả năng chứa 2 string mà không bị block. Chúng ta ghi 2 string vào channel, và đọc lần lượt. Output là: 
```shell
naveen
paul
```

## Một ví dụ khác
```go
package main

import (  
    "fmt"
    "time"
)

func write(ch chan int) {  
    for i := 0; i < 5; i++ {
        ch <- i
        fmt.Println("successfully wrote", i, "to ch")
    }
    close(ch)
}
func main() {  
    ch := make(chan int, 2)
    go write(ch)
    time.Sleep(2 * time.Second)
    for v := range ch {
        fmt.Println("read value", v,"from ch")
        time.Sleep(2 * time.Second)

    }
}
```
Chương trình trên có 1 buffered channel `ch` với capacity là 2 và pass vào `write` Goroutine. Trong `write` Goroutine, có một vòng lặp ghi từ 0 tới 4 vào `ch` channel. Vì capacity của `ch` là 2 nên giá trị 0 và 1 được ghi ngay lập tức vô `ch` và sau đó bị block. Do đó, đầu tiên 2 giá trị được in ra 
```shell
successfully wrote 0 to ch
successfully wrote 1 to ch
```

Sau đó, `ch` bị block cho tới khi có một Goroutine nào khác đọc giá trị từ `ch`. Main Goroutine sleep 2s, sau đó bắt đầu đọc từ `ch`. Sau đó `write` Goroutine không bị block, tiếp tục ghi giá trị `2` vô `ch`. Vòng lặp tiếp tục, cuối cùng output của chương trình là:

```shell
successfully wrote 0 to ch
successfully wrote 1 to ch
read value 0 from ch
successfully wrote 2 to ch
read value 1 from ch
successfully wrote 3 to ch
read value 2 from ch
successfully wrote 4 to ch
read value 3 from ch
read value 4 from ch
```

## Deadlock

```go
package main

import (
	"fmt"
)

func main() {
	ch := make(chan string, 2)
	ch <- "naveen"
	ch <- "paul"
	ch <- "steve"
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
```
Trong chương trình trên, channel `ch` có capacity là 2 nhưng được ghi tới 3 string. Khi chạy tới dòng `ch <- "steve"`, channel bi block do hết capacity. Một Goroutine khác phải đọc giá trị từ channel này, nhưng trong trường hợp này không có Goroutine nào đọc. Chương trình bị deadlock, and panic xảy ra. 

## Đóng buffered channels

Chúng ta có thể đóng một buffered channel bằng cách: 
```go
close(ch)
```

Sau đó, vẫn có thể đọc data từ một buffered channel đã đóng, channnel sẽ trả về data có sẵn trong channel mà chưa được đọc. Khi đọc hết, zero value được trả về. 

## Length vs Capacity
Capacity: Số lượng giá trị và channel có thể `hold` và được định nghĩa khi khởi tạo channel.
Length: số lương elementn tại thời điểm hiện tại đang trong channel.
Hiển thị capacity và length bằng 2 hàm:
```go
cap(ch)
len(ch)
```

## WaitGroup

Một WaitGroup được sử dụng cho việc đợi một nhóm Goroutine thực thì xong. The control sẽ block cho tới khi tất cả Goroutine kết thúc. Hãy xem ví dụ sau:

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func process(i int, wg *sync.WaitGroup) {
	fmt.Println("started Goroutine ", i)
	time.Sleep(2 * time.Second)
	fmt.Printf("Goroutine %d ended\n", i)
	wg.Done()
}

func main() {
	no := 3
	var wg sync.WaitGroup
	for i := 0; i < no; i++ {
		wg.Add(1)
		go process(i, &wg)
	}
	wg.Wait()
	fmt.Println("All go routines finished executing")
}
```

Tại hàm main(), a WaitGroup (WG) được tạo với zero value. WG làm việc như một counter, khi hàm `Add` được gọi, WG counter tăng lên 1 và giảm xuống khi gọi làm `Done`. Hàm `Wait()` sẽ đợi cho tới khi WG counter trở về zero. 

Trong ví dụ trên, chúng ta gọi hàm `Add` 3 lần, WG counter có giá trị 3, đồng thời 3 Goroutine cũng được gọi. Mỗi khi một Goroutine chạy xong, hàm `Done()` được gọi để giảm giá trị của WG counter. Khi hàm `Done()` được gọi 3 lần, WG counter trở về zero và main Goroutine tiếp tục chạy. 

Chú ý là pass con trỏ của biến wg. Nếu khônng phải là con trỏ, mỗi Goroutine sẽ có một bản copy của wg và hàm main() sẽ không được thông báo khi chúng chạy xong.

Output của chương trình:
```shell
started Goroutine  2
started Goroutine  0
started Goroutine  1
Goroutine 0 ended
Goroutine 2 ended
Goroutine 1 ended
All go routines finished executing
```
Order có thể khác do Goroutine có thể chạy khác nhau. 

## Worker pool implementation
Một workder pool là một tập hợp những thread đợi task được giao cho chúng. Khi hoàn thành, workder pool đổi trạng thái lại và đợi task tiếp theo.

Chúng ta implementation a worker pool bằng buffered channels. Trong ví dụ này, một workder pool task là tính tổng các chữ số của một số được users nhập vào. Ví dụ nếu 234 là input, the ouput là `2+3+4=9`. Input sẽ là các số ngẫu nhiên.

Core functionalities:
- Tạo ra một pool của Goroutines, lắng nghe input ở một buffered channe.
- Thêm một job như là input bào buffered channel.
- Viết kết quả ra một output bufered channel sau khi tính toán xong
- Đọc và in kết quả từ output buffered channel.



Chúng ta làm từng bước một. Đầu tiên tạo strucs đại diện cho job và result

```go
type Job struct {
	id       int
	randomno int
}
type Result struct {
	job         Job
	sumofdigits int
}
```
Sau đó, tạo một buffered chanels cho nhận job và xuất kết quả
```go
var jobs = make(chan Job, 10)
var result = make(chan Result, 10)
```

Hàm `digits` nhận input là một số `int` sau đó tính toán giá tổng các chữ số, hàm `Sleep` 2 giây để simulate việc tính toán tốn thời gian

```go
func digits(number int) int {
	sum := 0
	no := number
	for no != 0 {
		digit := no % 10
		sum += digit
		no /= 10
	}
	time.Sleep(2 * time.Second)
	return sum
}
```

Hàm sau tạo worker Goroutine
```go
func worker(wg *sync.WaitGroup) {
	for job := range jobs {
		output := Result{job, digits(job.randomno)
		result <- output
	}
	wg.Done()
}
```

Tạo workder pool 
```go
func createWorkerPool(noOfWorkders int) {
	var wg sync.WaitGroup
	for i := 0; i < noOfWorkers; i++ {
		wg.Add(1)
		go worker(&wg)
	}
	wg.Wait()
	close(results)

}
```
Viết function allocate jobs to workder:
```go
func allocate(noOfJobs int) {
	for i := 0; i < noOfJobs; i++ {
		randomno := rand.Intn(999)
		job := Job{i, randomno}
		jobs <- job
	}
	close(jobs)
}
```

Tiếp theo, viết hàm đọc kết quả từ `results` channel
```go
func result(done chan bool) {
	for result := range results {
		fmt.Printf("Job id %d, input random no %d , sum of digits %d\n", result.job.id, result.job.randomno, result.sumofdigits)
	}
	done <- true
}
```

Main function:
```go
func main() {
	startTime := time.Now()
	noOfJobs := 100
	go allocate(noOfJobs)
	done := make(chan bool)
	go result(done)
	noOfWorkers := 10
	createWorkerPool(noOfWorkers)
	<-done
	endTime := time.Now()
	diff := endTime.Sub(startTime)
	fmt.Println("total time taken ", diff.Seconds(), "seconds")
}
```
