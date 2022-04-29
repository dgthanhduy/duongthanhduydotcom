---
title: Tailwind CSS - Nên thử một lần
publishedDate: 2020/10/15
description: >-
  Tìm hiểu về Tailwind CSS
tags:
  - TailwindCSS
  - Front-End
---

![Tailwind CSS](/media/tailwindcss-1/01.png)

## Utility-first CSS framework

Chắc các bạn đang thắc mắc vì sao không phải tìm hiểu về `Tailwind CSS` mà lại là _"Utility-first CSS framework"_? Bình tĩnh. Chính khái niệm này làm nên sự khác biệt cho `Tailwind CSS` giữa một rừng CSS Framework ngoài kia, như : `Bootstrap`, `Foundation`, `Bulma` ,...

Hầu hết những framework còn lại đều chọn hướng tiếp cận là _"Component first"_, họ mang đến một set components được thiết kế sẵn, giúp tốc độ hoàn thiện thiết kế được đẩy rất nhanh, nhưng nó cũng mang trong mình một nhược điểm mà mình không thích lắm đó là việc Override các component đó rất cực.

Còn `Utility-first CSS framework` thì nói : _"Ở đây chúng tôi không làm thế!"_

![](https://media1.tenor.com/images/93ed578e1af9264dda5a31c1d08daaf6/tenor.gif){ width=75% }

Một `Utility-first CSS framework` sẽ chọn cách cung cấp những `low-level utility classes` tiện lợi hơn, để chúng ta thoả thích sáng tạo mà không cần viết thêm CSS.

Và `Tailwind CSS` là một `Utility-first CSS framework`.

## Vì sao nên dùng Tailwind CSS?

Với sự khác biệt so với `Bootstrap` nêu trên, thì việc chọn `Bootstrap` hay `Tailwind` đầu tiên là dựa trên mục đích bạn sử dụng framework.

`Bootstrap` sẽ cực kì hữu dụng khi bạn làm một UI khô khan như Admin Panel, Dashboard... không yêu cầu quá nhiều sự tuỳ chỉnh, `Bootstrap` có mọi thứ bạn cần, và quan trọng hơn là sự tiện lợi của nó. 👍👍

`Tailwind` sẽ cho bạn sự uyển chuyển, bạn sẽ tha hồ biến tấu giao diện của mình. Class dược đặt tên rất dễ hiểu và thân thiện, đọc tên class chúng ta có thể hiểu ngay mục đích của nó nằm đây để làm gì.

Tham khảo nhanh về `Tailwind` ở [đây](https://tailwindcomponents.com/cheatsheet/){target=\_blank}. Ngoài ra trang trên còn cung cấp những components được built with `Tailwind`, các bạn có thể tham khảo và mang về dùng nếu thích.

Cách cài đặt `Tailwind CSS` bạn xem ở trang chủ của hắn nhé : [Tailwind CSS](https://tailwindcss.com/docs/installation){target=\_blank}

Dĩ nhiên vẫn có một số đánh đổi khi dùng `Tailwind CSS` ví dụ như là ... những thứ kiểu như vầy đây :

```html
<img
  class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
  src="avatar.jpg"
/>
```

Một dây class dài ngoằn. 🐍🐍 . Đùa thôi, đừng lo, chúng ta có nhiều cách để giải quyết mấy con rắn này.

## Xử lý _"con rắn class"_

### 1. Tạo Component để tái sử dụng

Ví dụ một react component :

```js
// ./components/Contacts.js
import React from "react";

const Contacts = ({ contacts }) => (
  <div className="text-center">
    <ul className="p-0">
      {contacts.map((contact) => (
        <li
          key={contact.id}
          className="inline-block overflow-hidden m-2 leading-none"
        >
          <a
            className="text-white inline-block leading-none"
            href={contact.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {contact.icon}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Contacts;
```

Với cách tạo một Component, chúng ta có thể tái sử dụng style ở nhiều nơi mà không phải viết đi viết lại một chuỗi class, và ít phải lo nghĩ đến vấn đề maintain.

### 2.Dùng @apply để tạo class cho riêng mình

Với những đối tượng nhỏ, đơn giản, chúng ta có cách xử lý ít cồng kềnh hơn : xử dụng `@apply` để tạo ra CSS class của riêng mình từ built-in classes của `Tailwind CSS`

Ví dụ :

```html
<button class="btn-blue">Button</button>

<style>
  .btn-blue {
    @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>
```

Better practice :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-blue {
    @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
}
```

Việc dùng `@layer` directive sẽ giúp cho `Tailwind CSS` cấu trúc đúng cho style của chúng ta, tránh những lỗi phát sinh không đoán trước được do `override`, và giúp việc purging hoạt động chính xác hơn.

Tham khảo thêm về purging tại [đây](https://tailwindcss.com/docs/controlling-file-size){target=\_blank}

Nhưng nếu chúng ta cần nhiều button với màu sắc khác nhau, chúng ta có thể tách phần style lặp lại ra để có thể định nghĩa các class theo kiểu của `Bootstrap` như `'btn btn-primary'`, `'btn btn-secondary'`.

Kiểu như vầy :

```css
@layer components {
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }

  .btn-primary {
    @apply bg-blue-500 text-white;
  }
  .btn-primary:hover {
    @apply bg-blue-700;
  }

  .btn-secondary {
    @apply bg-gray-400 text-gray-800;
  }
  .btn-secondary:hover {
    @apply bg-gray-500;
  }
}
```

Sử dụng :

```html
<button class="btn btn-primary">Button in Blue</button>
<button class="btn btn-secondary">Button in Gray</button>
```

## Customizing design

Ngoài việc sử dụng các giá trị mặc định được định nghĩa sẵn bởi `Tailwind CSS` chúng ta hoàn toàn có thể thiết lập, override lại các giá trị đó bằng cách sửa file `tailwind.config.js` ở thư mục root.

Ví dụ :

```js
module.exports = {
  important: true,
  theme: {
    screens: {
      vs: "320px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
    extend: {},
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "7rem",
      "10xl": "8rem",
      "11xl": "9rem",
    },
    fontFamily: {
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
  },
  variants: {},
  plugins: [],
};
```

Như ở đây mình ví dụ việc thay đổi các breakpoint màn hình, fontSize, fontFamily. Còn rất nhiều thứ chúng ta có thể custom, các bạn có thể tham khảo thêm tại [đây](https://tailwindcss.com/docs/configuration){target=\_blank}

Ngoài ra tailwind cũng có nhiều thứ hay ho khác như : là một mobile-first framework, resposive so easy, có một extension `Tailwind CSS IntelliSense` cho `VS Code` rất xịn xò, ... vân vân và mây mây, nếu ~~không lười~~ có dịp mình sẽ lại tiếp tục viết về `Tailwind CSS`. 😎😎

## Kết

Ở bài viết này mình chỉ nêu quan điểm cá nhân của mình về `Tailwind CSS`, bài viết không mang tính hướng dẫn nên mình thường dẫn link để các bạn tự tìm hiểu nếu cảm thấy thích framework này như mình.

Các bạn có thích `Tailwind CSS` không? Hãy bình luận phân tích nhá! Cảm ơn đã đọc bài viết. 😘

Nội dung bài viết được tham khảo từ : https://tailwindcss.com/
