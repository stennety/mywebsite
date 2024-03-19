---
layout: post
title: Defer and Error Handling 1 - Defer
tags: [golang, defer]
---

## Defer là gì?

Defer được sử dụng để thự thi một hàm tại thời điểm hàm hiện tại trả về kết quả. Hãy xem ví dụ sau:

```go
package main

import (
	"fmt"
)

func finished() {
	fmt.Println("Finished finding largest")
}

func largest(nums []int) {
	defer finished()	
	fmt.Println("Started finding largest")
	max := nums[0]
	for _, v := range nums {
		if v > max {
			max = v
		}
	}
	fmt.Println("Largest number in", nums, "is", max)
}

func main() {
	nums := []int{78, 109, 2, 563, 300}
	largest(nums)
}
```
Chương trình tìm số lớn nhất trong một slice. Dòng đầu tiên của hàm `largest` call `defer` function `finished()`. Điều đó có nghĩa là hàm `finished()` sẽ được gọi ngay trước khi hàm `larget` return kết quả. Output:
```shell
Started finding largest
Largest number in [78 109 2 563 300] is 563
Finished finding largest
```

## Deferred methods

Defer không chỉ làm việc với functons, nó hoạt động với cả method. 

```go
package main

import (
	"fmt"
)


type person struct {
	firstName string
	lastName string
}

func (p person) fullName() {
	fmt.Printf("%s %s",p.firstName,p.lastName)
}

func main() {
	p := person {
		firstName: "John",
		lastName: "Smith",
	}
	defer p.fullName()
	fmt.Printf("Welcome ")	
}
```
Output: `Welcome John Smith`

## Arguments evaluation

Argument của defered function được lấy khi hàm `defer` thực thi, không phải tại lúc hàm hiện tại call done. Hãy xem ví dụ sau:

```go
package main

import (
	"fmt"
)

func printA(a int) {
	fmt.Println("value of a in deferred function", a)
}
func main() {
	a := 5
	defer printA(a)
	a = 10
	fmt.Println("value of a before deferred function call", a)

}
```

Ban đầu giá trị của `a` là 5, khi defer statment thực thi, giá trị của `a` là 5, sau đó giá trị của `a` được update lên 10. Output

```shell
value of a before deferred function call 10
value of a in deferred function 5
```

## Stack of defers

Khi nhiều defer được gọi, chúng được push vô stack và thực thi Last In First Out (LIFO) order.
Chương trình sau in ra string và reverse bằng cách sử dụng defers

```go
package main

import (
	"fmt"
)

func main() {
	name := "Naveen"
	fmt.Printf("Original String: %s\n", string(name))
	fmt.Printf("Reversed String: ")
	for _, v := range name {
		defer fmt.Printf("%c", v)
	}
}
```
