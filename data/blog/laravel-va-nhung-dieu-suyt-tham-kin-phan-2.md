---
title: Laravel và những điều suýt thầm kín (phần 2)
publishedDate: 2020/09/23
description: >-
  Tiếp tục series mẹo vặt Laravel.
category: Tech
tags:
  - PHP
  - Laravel
  - Tip and Trick
---

![Laravel Framework](/media/laravel-1/01.png)

> Để phục vụ cho nhu cầu tăng _~~một ít~~_ năng suất làm việc, mình đã tìm tòi và tổng kết vài mẹo vặt _( ~~không~~ ít được chia sẻ trên mạng, mình bỏ qua những mẹo đã có nhiều người chia sẻ nhé)_ mà Document của `Laravel` không nhắc đến, hoặc có nhắc đến mà chúng ta vô tình bỏ qua giữa những _deadline_ vội vã. 😢

Trở lại với series chuyện ~~vùng~~ thầm kín Laravel, hôm nay mình sẽ tiếp tục chia sẻ với các bạn thêm vài trò mèo nữa.

Xem lại phần 1 : [Laravel và những điều suýt thầm kín (phần 1)](/blog/laravel-va-nhung-dieu-suyt-tham-kin-phan-1)

## Two-level `$loop` trong Blade

Ở phần 1 mình đã có nhắc đến biến `$loop` thần thánh của vòng lặp `foreach` trong `Blade`. Thêm một magic với biến `$loop` đó là chúng ta có thể sử dụng nó trong two-level loop để có thể truy xuất đến biến cha thông qua `$loop->parent` .

Ví dụ:

```php
@foreach ($authors as $author)
 @foreach ($author->posts as $post)
  @if ($loop->parent->first)
    echo 'đây là vòng lặp cha đầu tiên.';
  @endif
 @endforeach
@endforeach
```

## Redirect tới một Controller Method

Với `redirect()`, chúng ta không chỉ có thể dùng cho URL, Routes, mà còn có thể redirect đến một method (controller method thôi nhé), và có thể truyền cả params vào :

```php
return redirect()->action('SomeController@method',
  ['param' => $value]);
```

## Eager Loading với cột chỉ định

Với Eager Loading, chúng ta có thể chỉ định những cột sẽ được lấy từ relationship.

Ví dụ :

```php
$data = App\Post::with('author:id,name')->get();
```

## Di chuyển nhanh đến Controller từ file Route

**Update** : Ở ver 8.x của Laravel thì chúng ta buộc phải xác định Controller là một Class nên mẹo này xem như là bắt buộc thực hiện rồi 👍

Thông thường chúng ta sẽ viết Route như vầy :

```php
Route::get('dummy', 'DummyController@action');
```

Hãy viết như vầy :

```php
Route::get('dummy',
 [\App\Http\Controllers\DummyController::class, 'action']);
```

Lợi thế của việc làm này đó là ta có thể Ctr + Click và Controller class để bay nhanh đến file Controller từ file Route mà đỡ phải tìm kiếm.

## Route Fallback

Mặc định Laravel sẽ throw một `404` khi không tìm được Route nào phù hợp (route not found), nếu chúng ta cần `404` có Logic cao siêu, có thể sử dụng `Route::fallback()`.

Ví dụ :

```php
Route::get('/home', 'HomeController@index');

// So many routes....

Route::fallback(function() {
 return 'Không có đường dẫn này, không có 404 luôn, 😫';
});

// Đặt Route::fallback ở cuối .

```

## `Auth::once()`?

Sử dụng `Auth::once()` để user đăng nhập cho **duy nhất** một request. Điều này nghĩa là không có một Session hay một Cookie nào tồn tại cho việc đăng nhập này.

Hy vọng người nào làm Stateless API với Laravel sẽ thích điều này. 😎

```php
if (Auth::once($credentials)) {
 //
}
// Trích Laravel documentation
```

## Đếm số bản ghi con với `withCount()`

Trong `hasMany()` relationship, để đếm số bản ghi con, Laravel đã cho chúng ta một Method : `withCount()`, dùng luôn không cần viết thêm nữa. Ví dụ để đếm số Posts của một Author :

```php
//Trong một controller method nào đó
 $authors = Author::withCount(['posts'])->get();
 return view('authors', compact('authors'));

//Trong authors Blade view, để lấy ra số đã count
//chúng ta có thuộc tính : [relationship]_count
//Ví dụ :
@foreach ($authors as $author)
 <tr>
  <td>{{ $author->name }}</td>
  <td class="text-center"> Số posts : {{ $author->posts_count }}</td>
 </tr>
@endforeach
```

## Thêm Filter Query khi load Relationship

Với `with()` chúng ta có thể Eager Loading một _(vài)_ relationship, hơn thế, chúng ta còn có thể thêm vài `filter` như giới hạn, sắp xếp, tìm kiếm cho `query` trong một `closure function` như sau :

```php
$authors = Author::with(['posts' => function($query) {
      $query->orderBy('time', 'desc'); //sắp xếp posts theo cột time
      $query->take(10); //giới hạn 10 posts
}])->get();
```

## Ẩn cột trong kết quả trả về từ Eloquent query

Có nhiều các để thực hiện điều này, cách _(có vẻ)_ nhanh nhất là : thêm `makeHidden()` vào kết quả. Ví dụ :

```php
$users = User::all()->makeHidden(['email_verified_at', 'deleted_at']);
```

## Thay đổi Validation Messages cho từng field.

Trong `FormRequest` class, chúng ta thêm một method : `messages()` để định nghĩa các messages. Ví dụ :

```php
class StoreUserRequest extends FormRequest
{
  public function rules()
  {
    return ['name' => 'required'];
  }
  public function messages()
  {
    return [
      'name.required' => 'Nhập tên vào đê bạn êi !!!',
    ];
  }
}
```

## Bật Maintenance Mode

Để bật maintenace mode, dùng lệnh :

```bash
php artisan down
```

Một vài flag :

- Message
- Thử lại sau X giây
- Xác định IP được truy cập khi đang Maintain.

```bash
php artisan down --message="Đang bảo trì bạn êii!" --retry=60
--allow=xxx.xxx.xxx.xxx
```

## Where"X"

Để tìm 1 `author` với `name` là "Dê Tê Dê", thông thường bạn sẽ dùng :

```php
$author = Author::where('name', 'Dê Tê Dê')->first();
```

Tuy nhiên, Laravel mang đến cho chúng ta một quyền năng :

```php
$author = Author::whereName('Dê Tê Dê')->first();
//Kể cả :
$author = Author::whereAge('25')->first();
$author = Author::whereLong('20cm')->first();
//Đều được tuốt
```

---

Hy vọng với những trò mèo này, việc ăn chơi cùng Laravel sẽ vui vẻ và thú vị hơn. Có trò gì mới, mình sẽ tiếp tục chia sẻ ở phần 3.

**Update** : Blog comment được rồi, hãy chia sẻ những bí quyết với ~~mình~~ nhau ở phần bình luận nha!
