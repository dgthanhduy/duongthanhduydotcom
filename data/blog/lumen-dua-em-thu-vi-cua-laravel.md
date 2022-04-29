---
title: Lumen đứa em thú vị của Laravel
publishedDate: 2020/08/21
description: >-
  Lumen được sinh ra với sứ mệnh cao cả là được dùng để xây dựng các micro-services và APIs, chúng ta có thể mong chờ điều gì ở _"thằng em bé bỏng"_ này?
tags:
  - PHP
  - Laravel
  - Lumen
  - API
---

## Giới thiệu

![Lumen framework](/media/lumen-1/01.png)

> The stunningly fast micro-framework by Laravel.

Đây là những gì đập ngay vào mắt khi vừa vào trang chủ của [Lumen](https://lumen.laravel.com/), nghĩa là gì? Đây là một micro-framework, được sinh ra bởi cùng cha đẻ của Laravel : Taylor Otwell.

Với sứ mệnh cao cả là được dùng để xây dựng các micro-services và APIs, rạch ròi hơn so với ông anh Laravel-một framework đa dụng, backtofront.

Chúng ta có thể mong chờ điều gì ở _"thằng em bé bỏng"_ này?

Đầu tiên là **tốc độ**, dĩ nhiên, nhỏ thì sẽ nhẹ, nhẹ khắc sẽ nhanh. Nhìn vào tấm hình kết quả benchmark này ta cũng có thể hình dung.

![Lumen benchmark](/media/lumen-1/02.png)

**Cộng đồng**, đừng lo, hãy nhớ lại đi, ông già của Lumen chính là ông già của Laravel.

**Sự tương đồng** với Laravel, dù tốc độ và khối lượng so với ông anh Laravel là một trời một đất nhưng Lumen vẫn không đánh mất những điều cốt lõi mà chúng ta yêu thích ở Laravel như Eloquent, caching, queues, validation, routing, middleware, và nhân vật chính quan trọng nhất : **Laravel service container**. Nhưng dĩ nhiên một số phần vẫn sẽ bị lượt bỏ đi để có dung lượng nhẹ nhàng hơn, hãy đọc Document để biết thêm chi tiết nhé.

Convention giống nhau nên việc làm quen với Lumen sau Laravel, hay nâng cấp ứng dụng Lumen lên Laravel cũng rất dễ dàng.

## Setup

### Yêu cầu server

- PHP >= 7.3
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension

Trên đây là yêu cầu của Lumen bản 8.x (thời điểm mình cập nhật, 10/2020).

## Install

Thằng nhỏ này cũng sử dụng Composer để quản lý dependencies và cài đặt. Nếu máy bạn chưa có Composer có thể cài đặt ở [đây](https://getcomposer.org/).

Sau khi đã có composer, chạy câu lệnh sau để tạo một Lumen project :

```bash
composer create-project --prefer-dist laravel/lumen tên-project
```

Ngồi ăn miếng bánh uống miếng cafe chờ cho tiến trình cài đặt, xong bạn có thể test xem Lumen core đã cài đặt ok không bằng cách chạy lệnh :

```bash
cd tên-project
php -S localhost:8000 -t public
```

## Config

Việc config cho Lumen khá dễ dàng, các bạn có thể đổi tên file `.env example` trong thư mục gốc của project thành `.env` và thay đổi giá trị trong đó.

Bài viết lấy thông tin tại https://lumen.laravel.com/docs/8.x

---

Nếu ~~không lười~~ có dịp mình sẽ viết tiếp về Lumen.

- Update 10/2020 : Mình đang sử dụng Lumen để làm một số API, điển hình là API cho chức năng comment của blog này, hứa hẹn sẽ có bài viết tiếp theo về Lumen ahihi.
