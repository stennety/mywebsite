---
layout: post
title: PostgreSQL 2 - Transaction Isolation
tags: [PostgreSQL]
---

PostgreSQL là một hệ quản trị cơ sở dữ liệu phổ biến với nhiều tính năng mạnh mẽ. Trong đó, Transaction Isolation là một tính năng quan trọng giúp đảm bảo tính toàn vẹn của dữ liệu trong khi thực hiện các thao tác cập nhật.

Transaction Isolation cho phép các thao tác cập nhật cơ sở dữ liệu được thực hiện đồng thời mà không bị ảnh hưởng bởi các thao tác cập nhật khác đang được thực hiện song song. Nó đảm bảo rằng một transaction sẽ không đọc hoặc cập nhật dữ liệu được đang được sử dụng bởi một transaction khác.

PostgreSQL hỗ trợ 4 cấp độ Transaction Isolation: Read Uncommitted, Read Committed, Repeatable Read, và Serializable. Mỗi cấp độ đều có mức độ bảo đảm tính toàn vẹn dữ liệu khác nhau, từ ít bảo đảm đến đầy đủ bảo đảm. Tùy thuộc vào tính chất và yêu cầu của ứng dụng, người dùng có thể lựa chọn cấp độ phù hợp để đảm bảo tính toàn vẹn của dữ liệu trong khi thực hiện các thao tác cập nhật.

## 4 cấp độ của transaction isolation

1. Read Uncommitted: Đây là cấp độ transaction thấp nhất và không đảm bảo tính toàn vẹn dữ liệu và kiểm soát đồng thời. Các transaction ở cấp độ này có thể đọc dữ liệu chưa được committed từ các transaction khác, dẫn đến các lỗi dirty reads, non-repeatable reads, and phantom reads.

2. Read Committed: Cấp độ này đảm bảo rằng các transaction chỉ xem dữ liệu đã được commited từ các transaction khác. Điều này có nghĩa là không thể xảy ra các lỗi dirty reads, và mỗi thao tác đọc sẽ xem dữ liệu đã được committed gần đây nhất. Tuy nhiên,  non-repeatable reads and phantom reads có thể xảy ra.

3. Repeatable Read: Cấp độ  này đảm bảo rằng một transaction sẽ luôn xem cùng dữ liệu cho một truy vấn cụ thể, ngay cả khi một transaction khác sửa đổi dữ liệu trong khi đó. Điều này được đạt được bằng cách giữ các  shared locks trên tất cả các hàng mà transaction đọc cho đến khi hoàn tất. Tuy nhiên, phantom reads vẫn có thể xảy ra.

4. Serializable: Đây là cấp độ  cao nhất và đảm bảo tính toàn vẹn dữ liệu và kiểm soát đồng thời mạnh nhất. Các transaction ở cấp độ này sẽ thực hiện tuần tự, ngay cả khi chúng thực sự thực hiện đồng thời. Điều này được đạt được bằng cách sử range locks trên tất cả dữ liệu được đọc hoặc sửa đổi bởi transaction, ngăn người dùng khác sửa đổi cùng dữ liệu đó cùng lúc. Cấp độ  này đảm bảo rằng phantom reads, non-repeatable reads, or dirty reads xảy ra.

## Cách lỗi xảy ra ở từng cấp độ

1. Đọc không đầy đủ (dirty read): Một transaction đọc dữ liệu được ghi bởi một transaction khác chưa  committed cùng lúc.

2. Đọc không lặp lại (non-repeatable read): Một transaction đọc lại dữ liệu mà nó đã đọc trước đó và phát hiện rằng dữ liệu đã bị sửa đổi bởi một transaction khác (đã commited từ khi đọc ban đầu).

3. Đọc giả (phantom read): Một transaction thực hiện lại một query trả về một tập hợp các hàng thỏa mãn một điều kiện tìm kiếm và phát hiện rằng tập hợp các hàng thỏa mãn điều kiện đã thay đổi do một transaction mới được committed gần đây.

4. Lỗi tuần tự (serialization anomaly): Kết quả của một nhóm giao dịch cam kết thành công không nhất quán với tất cả các thứ tự khả thi của việc chạy các giao dịch đó một cách tuần tự.

Tóm tắt:

<style>
table, th, td {
  border: 1px solid black;
}
</style>

<table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th> 
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td>80</td>
  </tr>
</table>

LevelDrity readnon-repeatable readphaton readserialization anomaly Read un-committedAllowedPossiblePossiblePossibleRead committedNot possiblePossiblePossiblePossibleRepeatable read Not possibleNot possiblePossiblePossibleSerializableNot possibleNot possibleNot possibleNot possible

Read Committed Isolation Level

 Một transaction sử dụng Read committed level, một câu query SELECT query (without a FOR UPDATE/SHARE clause) chỉ thấy data đã được committed trước đó, nó không thấy data chưa được commit hay commit từ một transaction đồng thời chạy khác. Câu query sử dụng 1 snapshot của databas tại thời điểm bắt đầu transaction, tuy nhiên câu select vẫn nhìn thấy data được update trước đó của chỉnh transaction đó mặc dù nó chưa commit. Do đó, 2 câu select thuộc cùng 1 transaction có thể ra data khác nhau. 

UPDATE, DELETE, SELECT FOR UPDATE, and SELECT FOR SHARE có chung cách xử lý như SELECT, nó xác định những target rows tại thời điểm bắt đầu transaction. Tuy nhiên, target rows có thể bị update (hoặc lock hoặc delete) bởi transaction khác, trong trường hợp này, nó sẽ đợi cho transaction tới trước update ( committed or rollback) .

Repeatable Read Isolation Level

Chỉ nhìn thấy data đã được committed trước khi transaction bắt đầu. Nó không thấy data chưa được committed hay đã được committed bởi những concurrent transactions

This level is different from Read Committed in that a query in a repeatable read transaction sees a snapshot as of the start of the first non-transaction-control statement in the transaction, not as of the start of the current statement within the transaction. Thus, successive SELECT commands within a single transaction see the same data, i.e., they do not see changes made by other transactions that committed after their own transaction started.

UPDATE, DELETE, MERGE, SELECT FOR UPDATE, and SELECT FOR SHARE commands behave the same as SELECT in terms of searching for target rows: they will only find target rows that were committed as of the transaction start time. However, such a target row might have already been updated (or deleted or locked) by another concurrent transaction by the time it is found. In this case, the repeatable read transaction will wait for the first updating transaction to commit or roll back (if it is still in progress). If the first updater rolls back, then its effects are negated (đảo ngược lại) and the repeatable read transaction can proceed with updating the originally found row. But if the first updater commits (and actually updated or deleted the row, not just locked it) then the repeatable read transaction will be rolled back with the message:

ERROR:  could not serialize access due to concurrent update

because a repeatable read transaction cannot modify or lock rows changed by other transactions after the repeatable read transaction began.

Serializable Isolation Level

The Serializable isolation level provides the strictest transaction isolation. This level emulates serial transaction execution for all committed transactions; as if transactions had been executed one after another, serially, rather than concurrently. However, like the Repeatable Read level, applications using this level must be prepared to retry transactions due to serialization failures. In fact, this isolation level works exactly the same as Repeatable Read except that it also monitors for conditions which could make execution of a concurrent set of serializable transactions behave in a manner inconsistent with all possible serial (one at a time) executions of those transactions. This monitoring does not introduce any blocking beyond that present in repeatable read, but there is some overhead to the monitoring, and detection of the conditions which could cause a serialization anomaly will trigger a serialization failure.

Get go to an example of table mytab

 class | value
-------+-------
     1 |    10
     1 |    20
     2 |   100
     2 |   200

. A transaction A computes:

SELECT SUM(value) FROM mytab WHERE class = 1;

and then inserts the result (30) as the value in a new row with class = 2. Concurrently, serializable transaction B computes:

SELECT SUM(value) FROM mytab WHERE class = 2;

and obtains the result 300, which it inserts in a new row with class = 1. Then both transactions try to commit. If either transaction were running at the Repeatable Read isolation level, both would be allowed to commit; but since there is no serial order of execution consistent with the result, using Serializable transactions will allow one transaction to commit and will roll the other back with this message:

ERROR:  could not serialize access due to read/write dependencies among transactions

This is because if A had executed before B, B would have computed the sum 330, not 300, and similarly the other order would have resulted in a different sum computed by A.

When relying on Serializable transactions to prevent anomalies (điều không mong muốn, unexpected behavior) , it is important that any data read from a permanent user table not be considered valid until the transaction which read it has successfully committed. This is true even for read-only transactions, except that data read within a deferrable read-only transaction is known to be valid as soon as it is read, because such a transaction waits until it can acquire a snapshot guaranteed to be free from such problems before starting to read any data. In all other cases applications must not depend on results read during a transaction that later aborted; instead, they should retry the transaction until it succeeds.