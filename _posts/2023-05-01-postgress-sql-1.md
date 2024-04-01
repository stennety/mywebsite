---
layout: post
title: PostgreSQL 1 - Indexes
tags: [PostgreSQL]
---

Chỉ mục (indexes) là một cách thông dụng để cải thiện hiệu suất của cơ sở dữ liệu. Chỉ mục cho phép máy chủ cơ sở dữ liệu tìm kiếm và truy xuất các hàng cụ thể nhanh hơn nhiều so với khi không có chỉ mục. Tuy nhiên, chỉ mục cũng làm tăng chi phí tổng thể của hệ thống cơ sở dữ liệu, do đó nên sử dụng chỉ mục một cách hợp lý.


## Giới thiệu

Giả sư ta có table sau và câu query được thực hiện rất nhiều lần trong ứng dụng

```sql
CREATE TABLE test1 (
    id integer,
    content varchar
);

SELECT content FROM test1 WHERE id = constant;
```

Nếu không có sự chuẩn bị nào, hệ thống sẽ scan toàn bộ table `test1`, từng dòng một, để tìm tất cả những entries thoả điều kiện. If có nhiều dòng trong `test1` và chỉ có một vài dòng( hoạt chỉ một hoặc 0 dòng) được trả về từ câu query trên, đó thực sự là là một cách làm không hiệu quả. Nếu hệ thống lưu trữ index của column `id`, nó có thể tìm kiếm một cách hiệu quả hơn. 

Một phương pháp tương tự được sử dụng trong hầu hết các cuốn sách phi hư cấu: các thuật ngữ và khái niệm mà người đọc thường xuyên tra cứu được sưu tầm trong một chỉ mục chữ cái ở cuối sách. Người đọc có thể quét nhanh chỉ mục và chuyển đến các trang thích hợp, thay vì phải đọc toàn bộ sách để tìm tài liệu mong muốn. Như cách tác giả phải dự đoán những mục mà người đọc có thể tìm kiếm, việc của lập trình viên cơ sở dữ liệu là dự đoán những chỉ mục nào sẽ hữu ích.


To create an index: 
```sql

CREATE INDEX test1_id_index ON test1 (id);
test1_id_index is named by you. 
```

Đó là tất cả những gì chúng ta cần, không cần thêm gì, hệ thống sẽ tự động cập nhật index khi table thay đổi và sẽ sử dụng index để thực thi câu query khi hệ thông nghĩ rằng dùng index sẽ hiệu quả hơn việc scan tuần tự. Chúng ta vẫn phải sữ dụng command `ANALYZE` để thống kê query planner. 

Indexes can also benefit UPDATE and DELETE commands with search conditions. Indexes can moreover be used in join searches. Thus, an index defined on a column that is part of a join condition can also significantly speed up queries with joins.

Creating an index on a large table can take a long time. By default, PostgreSQL allows reads (SELECT statements) to occur on the table in parallel with index creation, but writes (INSERT, UPDATE, DELETE) are blocked until the index build is finished

Index types

By default, the CREATE INDEX command creates B-tree indexes, which fit the most common situations. The other index types are selected by writing the keyword USING followed by the index type name. For example, to create a Hash index:

CREATE INDEX name ON table USING HASH (column);

Other type of index in PostgreSQL are: GiST, SP-GiST, GIN, BRIN.

B-tree index: Đây là chỉ mục phổ biến nhất trong Postgre SQL. Nó sử dụng cấu trúc cây B để lưu trữ các giá trị chỉ mục. Chỉ mục B-tree rất hiệu quả cho các truy vấn sử dụng toán tử so sánh, chẳng hạn như =, >, <, >=, <=.

Hash index: Đây là một loại chỉ mục sử dụng bảng băm để lưu trữ các giá trị chỉ mục. Chỉ mục băm thường được sử dụng cho các truy vấn sử dụng toán tử băm, chẳng hạn như =.Gián đoạn băm (partitioned hash index): Đây là một loại chỉ mục kết hợp giữa gián đoạn chỉ mục và chỉ mục băm.