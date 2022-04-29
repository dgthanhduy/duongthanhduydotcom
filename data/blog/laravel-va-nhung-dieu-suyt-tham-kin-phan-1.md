---
title: Laravel và những điều suýt thầm kín (phần 1)
publishedDate: 2020/08/12
description: Để phục vụ cho nhu cầu tăng năng suất làm việc, mình đã tìm tòi và
  tổng kết vài mẹo vặt mà Document của `Laravel` không nhắc đến, hoặc có nhắc
  đến mà chúng ta vô tình bỏ qua.
tags:
  - PHP
  - Laravel
  - Tip and Trick
---

![Laravel và những điều suýt thầm kín (phần 1)](/media/laravel-1/01.png)

Để phục vụ cho nhu cầu tăng _~~một ít~~_ năng suất làm việc, mình đã tìm tòi và tổng kết vài mẹo vặt _( ~~không~~ ít được chia sẻ trên mạng, mình bỏ qua những mẹo đã có nhiều người chia sẻ nhé)_ mà Document của `Laravel` không nhắc đến, hoặc có nhắc đến mà chúng ta vô tình bỏ qua giữa những _deadline_ vội vã. 😢

## Biến `$loop` trong vòng lặp `@foreach` trong blade template

Trong vòng lặp `@foreach`, chúng ta có thể sử dụng biến `$loop` để kiểm tra đó có phải là lần lặp cuối, hoặc đầu tiên không.

Ví dụ

```php
@foreach ($users as $user)
  @if ($loop->first)
    <p>Đây là lần lặp đầu tiên</p> //in các thứ
  @endif
  @if ($loop->last)
    <p>Đây là lần lặp cuối cùng</p> //in các thứ
  @endif
  <p>{{ $user->id }}</p>
@endforeach
```

Vẫn còn nhiều thuộc tính khác của biến `$loop` như `$loop->iteration` hay `$loop->count` để sử dụng.

Tham khảo thêm ở : <https://laravel.com/docs/master/blade#the-loop-variable>

## Method where date của eloquent

Trong Eloquent, chúng ta có thể kiểm tra ngày tháng bằng các hàm : `whereDay()`, `whereMonth()`, `whereYear()` ,...

Ví dụ :

```php
$products = Product::whereDate('created_at', '2020-01-31')->get();
$products = Product::whereMonth('created_at', '06')->get();
$products = Product::whereDay('created_at', '16')->get();
$products = Product::whereYear('created_at', date('Y'))->get();
$products = Product::whereTime('created_at', '=', '11:14:32')->get();
```

## Model không timestamps columns

Nếu DB table của bạn không _(cần thiết)_ có hai columns `created_at` , `updated_at`, Ta có thể tạo một Eloquent model không dùng đến 2 columns đó bằng cách đặt thuộc tính `$timestamps = false;`.

```php
class Dummy extends Model
{
 public $timestamps = false;
}
```

## `hasMany()`. But how many?

Trong Eloquent hasMany() relationships, chúng ta có thể lọc kết quả theo số lượng bản ghi con.

```php
//Author->hasMany(Post::class)

$authors = Author::has('posts', '>', 5)->get(); //books có "s" nhé
```

## `hasMany()` và `saveMany()`

Nếu model có `hasMany()` relationship, chúng ta có thể dùng `saveMany()` để lưu nhiều bản ghi con từ bản ghi gốc, nhanh gọn lẹ nhẹ. 😀

```php
//Post->hasMany(Comment::class)

$post = Post::find(1);
$post->comments()->saveMany([
  new Comment(['content' => 'Comment số 1']),
  new Comment(['content' => 'Comment số 2']),
  ...
]);
```

## Gửi email test vào `log`

Đã có nhiều lần mình cần test email, cách củ chuối nhất là bắn luôn mail bằng Mailgun cho nó sang, hoặc chính thống và hợp lý hơn là sử dụng các Fake mail server như Mailtrap.

Ngoài những cách trên _(phải setup vật vã)_ 😫 chúng ta còn có thể sử dụng luôn file `storage/logs/laravel.log` để lưu nội dung mail test, bằng cách khai báo `MAIL_DRIVER=log` trong file `.env`.

## Thêm tham số, biến số vào `log`

Như các bạn đã biết, chúng ta có thể sử dụng `Log::info()` hoặc ngắn hơn là `info()` để viết vài dòng lưu bút vào file `log`. Để cụ thể hoá dễ hiểu hơn cho dòng lưu bút ấy, chúng ta có thể thêm vào các tham số.

Ví dụ

```php
Log::info('Anh dzai này cần được lưu id : ', ['id' => $user->id]);
```

## Sử dụng `Route::view()`

Nếu bạn muốn tạo `Route` chỉ để hiện một `View`, thì đừng tạo thêm `Controller` làm gì. ☝

Hãy dùng `Route::view()`

```php
// Đừng làm như vầy ...
Route::get('doc', 'DummyController@doc');
// Cộng với như vầy ...
class DummyController extends Controller
{
 public function doc()
 {
  return view('doc');
 }
}

// Hãy làm như vầy
Route::view('doc', 'doc');
```

## Blade `@auth` directive

Ngoài cách sử dụng `@if` để kiểm tra tình trạng đăng nhập trong Blade view, chúng ta có thể sử dụng directive `@auth`.

```php
//Thông thường ta dùng
@if(auth()->user())
  // User đã đăng nhập
@endif
//Cách khác ngắn hơn
@auth
  // Cũng là User đã đăng nhập
@endauth
//Ngược lại với @auth là @guest
@guest
  // User chưa đăng nhập
@endguest
```

## Hàm `withDefault()` trong relationships Model

Bạn có thể gán một model mặc định trong `belongTo` (hoặc các relationship khác) để tránh lỗi khi gọi kiểu `{{ $post->author->name }}`, nếu `$post->author` không tồn tại hoặc `null` thì 99.99% là ăn lỗi ngay. 🤦‍♂️

`withDefault()` sẽ giúp chúng ta tránh được lỗi này, nó sẽ giúp cho hàm `author()` này trả về model mặc định mà các bạn đã định nghĩa khi `failed`.

```php
function author(){
    return $this->belongTo('\App\Author')->withDefault([
        'age' => 21
        ...
    ]);
}
```

Còn vài mẹo nữa, nhưng bài dài quá ~~viết~~ đọc ngán nên phần còn lại xin hẹn ở phần sau nhá. 🖐

Link phần 2 : [Laravel và những điều suýt thầm kín (phần 2)](/blog/laravel-va-nhung-dieu-suyt-tham-kin-phan-2)
