---
layout: post
title: Buffered Channels and Worker Pools
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

Vẫn có thể đọc data từ một buffered channel đã đóng, channnel sẽ trả về data có sẵn trong channel mà chưa được đọc. Khi đọc hết, zero value được trả về. 

## Length vs Capacity
Capacity: Số lượng giá trị và channel có thể `hold` và được định nghĩa khi khởi tạo channel
Length: số lương elementn tại thời điểm hiện tại đang trong channel.
