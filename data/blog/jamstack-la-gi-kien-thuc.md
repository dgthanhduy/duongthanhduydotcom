---
title: Đú cùng công nghệ JAMstack
date: 2020/11/02
description: >-
  Tìm hiểu về Jamstack, vì sao lại hot.
tags:
  - Fullstack
  - Jamstack
  - API
  - Javascript
---

![](/media/jamstack-1/01.jpeg)

## What (the Hell) is JAMstack?

> Jamstack is an architecture designed to make the web faster, more secure, and easier to scale. It builds on many of the tools and workflows which developers love, and which bring maximum productivity.

Trích https://jamstack.org/

Vậy cuối cùng JAMstack là cái quái gì?

**JAMstack là một kiến trúc phát triển web, bên cạnh LAMPstack, MEANstack hay MERNstack,.... Nó không phải là một ngôn ngữ lập trình hay framework. Nó là dạng một phương pháp phát triển web nhằm mục đích tạo ra web có hiệu suất tốt hơn, bảo mật cao hơn, chi phí mở rộng thấp hơn và trải nghiệm tốt hơn _(cho cả developer và user)_.**

"JAM" ở đây là viết tắt của :

- **J**avascript

- **A**PI

- **M**arkup

![](/media/jamstack-1/02.jpeg)

JAMstack không bắt chúng ta phải sử dụng công nghệ nào cả, thích dùng Vanilla JS, hay typescript, hay WebAssembly, ... cái gì cũng được.

Chữ **A** cũng vậy, ta dùng Js Fetch dữ liệu từ nguồn nào cũng được, từ API ở server chạy tại nhà, hay trên host, server, hay dùng headless CMS, serverless Functions,...

Về nội dung thì có vô vàn các static-site generator như : Hugo, Gatsby, Jekyll, Nuxt,...

Cơ bản là nó méo quan trọng mình làm cách nào, miễn đúng yêu cầu của nó là được.

## J + A + M = Hay ho?

### 1.Tốc độ

Các trang web JAMstack nhanh, nhờ vào nguyên tắc _"pre-rendering"_ và _"decoupling"_, nghĩa là các file HTML được tạo trước (khi deploy) nên không cần biên dịch cho từng request, và với sự giúp sức của CDN ([Content Delivery Network](https://www.hostinger.vn/huong-dan/cdn-la-gi/)), các file HTML được cache và phân phối với một tốc độ bàn thờ 🚲🚲 vì khi đó user không cần phải chạy đến tận server ở Mỹ để nhận data mà có thể nhận data ở chi nhánh cạnh nhà.

### 2.Bảo mật

Đầu tiên, một static-site là không có gì để hack, việc tương tác được thực hiện thông qua API nên việc thông qua một web JAMstack để hack được máy chủ là rất khó khăn.

### 3.Rẻ, và dễ mở rộng

Một host đơn giản đã có thể host được một static-site, việc di chuyển, mở rộng hệ thống cũng rất dễ dàng, khi static-site hầu hết có config gần như bằng zero.

### 4.Dễ học dễ hành

Vì JAMstack không bắt buộc chúng ta phải dùng công nghệ nào nhất định, nên biển trời mênh mông này là của chúng ta, việc bắt đầu từ đâu, học cái gì, dùng cái gì là do ta quyết định. Ez Game 😁😁

## Cũng không hay lắm.

### 1. Editor không thích điều này.

Việc viết content bằng Markdown có thể gây khó dễ cho editor, writter. Nhưng may thay, những CMS như [Netlify CMS](https://www.netlifycms.org/) được sinh ra với slogan :

> Static + content management = ♥

Đã giúp việc viết content cho static-site đã trở nên đáng yêu vô cùng. 👍👍

### 2. Cập nhật khá khó khăn.

Việc cập nhật một đoạn nhỏ trong toàn bộ ứng dụng sẽ phải thực hiện lại toàn bộ quá trình build ứng dụng, với một ứng dụng lớn việc này thật sự rất đáng lưu tâm.

### 3.Thiếu sự linh hoạt.

Đánh đổi để có được tốc độ của mấy anh tổ lái là việc ứng dụng JAMstack mất đi sự linh hoạt của một _"trang web động"_. Chỉ bằng cách gọi API, chúng ta thật sự khá khó khăn trong việc thực hiện những chức năng cao siêu trong một ứng dụng JAMstack.

## Bắt đầu từ đâu đây?

Thấy JAMstack có vẻ hay ho, vậy ta nên bắt đầu từ đâu?

Các bạn có thể tham khảo [Netlify](https://www.netlify.com/), [Gatsby](https://www.gatsbyjs.com/) và [Firebase](https://firebase.google.com/) như mình.

Hoặc bắt đầu từ đây : https://github.com/automata/awesome-jamstack , muốn đọc gì có đó.

Nếu các bạn lười dịch ~~như mình~~, hãy comment ở bên dưới, mình ~~không dám hứa~~ sẽ quay lại mạnh mẽ hơn, sâu hơn cùng JAMstack vào một dịp không xa, hoặc thông qua bài viết kể về việc làm ra Blog này.
