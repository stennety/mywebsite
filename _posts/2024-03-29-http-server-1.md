---
layout: post
title: Golang HTTP Server 1 - Giới thiệu bài toán và cài đặt environment
tags: [golang, gin, http server]
---

Trong bài này chúng ta sẽ cùng nhau dựng một HTTP server đơn giản bằng cách sử dụng một web framework tên là GIN (https://github.com/gin-gonic/gin). 

Yêu cầu: xây dựng một REST API quản lý TODO, có các API như sau:
- Đăng ký / Đăng nhập 
- Thêm/xoá/sửa TODO, list and detail API, của user hiện tại, mọi request đều require authentication

Tech stack:
- Postgress SQL
- Go 1.21.5
- GIN (https://github.com/gin-gonic/gin)
- Docker


## Setup dev env





