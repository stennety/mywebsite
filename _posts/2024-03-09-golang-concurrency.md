---
layout: post
title: Giới thiệu về Concurrency
tags: [golang, concurrency]
---
Trước tiên chúng ta cần phân biệt hai khái niệm dễ gây nhầm lẫn là concurrency và paralled. 

Notes: 2 khái niệm này khi dịch ra tiếng Việt khá là giống nhau và khó phân biệt nên tốt nhất là sử dụng trực tiếp từ tiếng Anh và không dịch ra tiếng Việt. 

## Concurrency là gì

Hiểu đơn giản concurrecy là khả năng deal với nhiều tasks cùng một lúc. Ví dụ, một người đang chạy bộ và dây giầy của anh ta bị tuột, người đó dừng lại, buộc dây giầy và tiếp tục chạy bộ. Đó là ví dụ đơn giản của concurency. Người đó có khả năng handle cả việc chạy và buộc dây giày, người đó có thể handle nhiều việc cùng một lúc. 

## Vậy parallelism là gì và sự khác nhau giữa concurrency và parallelism

Parallelism có thể hiểu đơn giản là làm nhiều việc cùng một lúc, nghe có vẻ khá giống với concurrency nhưng thực ra chúng rất khác nhau. 
Quay về ví dụ trước, người chạy bộ đó vừa chạy vừa nghe nhạc trên chiếc iPod của anh ta, trong trường hợp này, việc chạy và việc nghe diễn ra đồng thời, anh ta có khả năng làm nhiều việc một lúc, đó gọi là parallelism. 

## A technical point of view cho 2 khái niệm trên

Giả sử chúng ta đang lập trình một web browser. Có 2 thành phần cơ bản của một web browser là: Rendering HTML pages and downloader files từ trên internet. Giả sự 2 thành phần trên có thể chạy độc lập. 

Khi web browser chạy trên single-core processer, processer sẽ chuyển đổi giữa 2 thành phần, lúc thì processer sẽ download files và lúc sau thì chuyển qua render HTML page. Đó gọi là concurrency.

Khi browser đó chạy trên multi-core processer, trong trường hợp này cả downloder và rendering chạy cùng lúc. Đó gọi là parallelism. 

Hình minh hoạ

![alt text](https://golangbot.com/content/images/2017/06/concurrency-parallelism-copy.png)

Một lưu ý là không phải lúc nào paralelism cũng chạy nhanh hơn. Vì khi chạy parallel các thành phần phải giao tiếp với nhau. Tronng ví dụ trên, khi download file hoàn thành, nó phải giao tiếp với user, hiển thị một popup chẳng hạn, việc đó làm tốn thơi gian hơn so với concurrency.

## Concurrency trong Go

Concurrency trong Go được handle bởi `Gorounties` và `channels`. Chúng ta sẽ tìm hiểu cách sử dụng chúng trong bài tới. 

Notes: Bài viết được lược dịch từ: https://golangbot.com/goroutines/
