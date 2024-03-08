---
layout: post
title: Giới thiệu về Python Decorator Function
---


Trong Python, Decorator là một tính năng mạnh mẽ cho phép bạn thay đổi hoặc mở rộng hành vi của một hàm mà không cần thay đổi mã nguồn gốc của hàm đó. Decorator giúp tách biệt việc xử lý logic và chức năng bổ sung, đồng thời cung cấp một cách linh hoạt để mở rộng chức năng của một hàm.

Một decorator function là một hàm bao bọc một hàm khác và thực hiện các thay đổi hoặc chức năng bổ sung trước, sau hoặc xung quanh hàm gốc. Điều này cho phép bạn thêm các chức năng bổ sung như logging, caching, xác thực, đo lường thời gian và nhiều hơn nữa vào một hàm mà không cần phải sửa đổi mã nguồn của hàm đó.

Ví dụ dưới đây minh họa cách sử dụng decorator function trong Python:

```python
def uppercase_decorator(func):
    def wrapper(text):
        result = func(text.upper())
        return result
    return wrapper

@uppercase_decorator
def greet(name):
    return f"Hello, {name}!"

greeting = greet("John")
print(greeting)
```
Trong ví dụ trên, chúng ta đã định nghĩa một decorator function có tên là uppercase_decorator. Nó nhận một hàm func làm đối số và trả về một hàm wrapper mới. wrapper là nơi chúng ta thực hiện các thay đổi hoặc chức năng bổ sung trước và sau khi hàm gốc func được gọi.

Bằng cách sử dụng decorator function @uppercase_decorator trước hàm greet, chúng ta đã bọc hàm greet trong decorator. Khi chúng ta gọi greet("John"), decorator sẽ thực thi và chuyển đổi tên thành chữ hoa trước khi gọi hàm gốc. Sau đó, decorator nhận kết quả trả về từ hàm gốc và trả về kết quả đã được xử lý.

Kết quả đầu ra sẽ là:

```shell
Hello, JOHN!
```
Như vậy, decorator function uppercase_decorator đã thay đổi hành vi của hàm greet bằng cách làm cho tên được chuyển đổi thành chữ hoa trước khi in ra kết quả chào mừng.
