---
layout: post
title: Defer and Error Handling 2 - Error handling
tags: [golang, defer]
---

## Error

Ví dụ sau chúng ta mở một file không có tồn tại trong hệ thống

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	f, err := os.Open("/test.txt")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(f.Name(), "opened successfully")
}
```

Cách lý tưởng để handling error trong Go là compare error result với giá trị `nil`. Gía trị `nil` chứng tỏ không có error nào xảy ra, `non-nill` value chứng tỏ có lỗi xảy ra.


## Error type representation
Error là một interface như sau:
```go
type error interface {
    Error() string
}
```

Bất cứ type nào implement method ` Error() string` đều có thể sử dụng như một error.

## Nhưng cách khác nhau để extract data từ lỗi.

Ở ví dụ trên, lỗi được in ra là 
```shell
open /test.txt: No such file or directory
```
Làm sao chúng ta nếu chúng ta muốn lấy đường dẫn của file gây lỗi. 

### 1. Converting the error to the underlying type and retrieving more information from the struct fields
