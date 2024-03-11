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
