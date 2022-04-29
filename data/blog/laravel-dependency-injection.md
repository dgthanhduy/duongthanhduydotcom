---
title: Laravel - Làm sao để Controller trở nên slim fit? (Phần 1)
publishedDate: 2020/12/02
description: Làm sao để thu gọn Controller Laravel? Dependency injection,
  services methods và static helper method, dùng làm sao cho tốt?
tags:
  - PHP
  - Laravel
  - Dependency Injection
  - SOLID
  - Tip and Trick
---

![Laravel - Làm sao để Controller trở nên slim fit? (Phần 1)](/media/laravel-di/01.png "Laravel - Làm sao để Controller trở nên slim fit? (Phần 1)")

Chắc hẳn mọi người cũng đã nghe đến những cụm từ như : `skinny controller`, `service layer`, và đặc biệt là `Dependency Injection`. Vậy chúng có liên quan ~~con mợ~~ gì đến nhau?

Đầu tiên là `skinny controller` trong mô hình MVC, chữ C có nghĩa là Controller (chắc ai cũng biết rồi, nếu chưa biết thì có thể hóng bài viết nhăng nhít về mô hình MVC sắp tới của mình, hehe), và đa số lời khuyên được đưa ra là hãy giữ cho Controller nhẹ nhàng nhất có thể, Controller chỉ nên giữ nhiệm vụ tiếp nhận `request` và phụt ra `response`.

Vì sao ư? Một trong những lí do chính là khi tiếp nhận một `request`, đôi khi phải trải qua rất nhiều công đoạn xào nấu để có thể đưa ra được `response`, việc nhét tất cả logic vào Controller sẽ làm cho Controller ngày càng phình to và khó maintain, cũng như khó reuse.

Bây giờ liên quan đến `service layer` rồi nè. Theo định nghĩa _(mà mình đã đọc được ở đâu đó)_ thì :

> "Service Layer" nằm ở giữa tầng UI và tầng database backend. Nó phụ trách việc biến đổi và xử lý dữ liệu giữa 2 tầng với nhau.

Nếu chẳng may bạn đọc định nghĩa trên mà vẫn méo hiểu ~~như mình~~ thì cứ hiểu nôm na nó là nơi để vứt tất cả business logic vào cho Controller rảnh nợ :)) Thật ra chúng ta cũng có thể ném hết logic vào Model, nhưng như vậy thì ... Cũng chả khác việc vứt vào Controller là mấy nhỉ? 😂😂 Thôi thì ở đây mình bàn về `service layer` nên bỏ qua Model nhé.

Data flow của chúng ta sẽ đại khái kiểu như vầy :

```
UI (view) > Controller > Service > Model/Database
> Raw Data > Service > Controller > Response
```

## Ví dụ về sự "nên" mang code từ Controller sang Service.

Ví dụ như chúng ta có một ReportController dùng để trả về dữ liệu cho một bảng report như thế này :

![](/media/laravel-di/02.png)

Nếu vứt hết code vào Controller chúng ta sẽ có đống này :

```php
// ... use ...
class ReportController extends Controller
{
  public function personal($id, $daterange)
  {
    $dateFrom = subStr($daterange, 0, 10);
    $dateTo = subStr($daterange, 11, 10);
    $products = Product::with('category')->get();
    $categories = Category::all();
    $sale_categories = [];
    $admin_categories = [];
    foreach ($categories as $item) {
        // 8 dòng set up hai mảng categories
    };
    $sale_deliveries = Delivery::with(['liability','customer'])
        ->whereBetween('time', [$dateFrom, $dateTo])
        ->where('user_order_id', $id)
        ->get();
    $admin_deliveries = Delivery::with(['liability','customer'])
        ->whereBetween('time', [$dateFrom, $dateTo])
        ->where('user_id', $id)
        ->get();
    $sale_totalbefore = 0;
    $sale_debt = 0;
    foreach ($sale_deliveries as $delivery) {
        // n Dòng (n>=10)
    }
    $admin_totalbefore = 0;
    $admin_debt = 0;
    foreach ($admin_deliveries as $delivery) {
        // n Dòng (n>=10)
    }
    $data = [
        // 4 dòng xử lý data
    ];
    return response()->json(
        $data,
        200,
        ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
        JSON_UNESCAPED_UNICODE
    );
  }
}
```

Các bạn thấy cái controller trên có kinh không, đấy chỉ mới là 1 function, và mình ẩn hơi bị nhiều dòng code rồi nhé :)))

Bây giờ câu hỏi đặt ra là làm sao để mang code từ Controller sang Service? Có vài cách, mình sẽ trình bày phương hướng xử lý và lợi hại của từng cách ngay dưới này.

**_Lưu ý_** : ~~vì lười~~ mình sẽ không hướng dẫn cụ thể việc viết code như thế nào, định nghĩa mọi thứ ra sao, mình chỉ trình bày cách hiểu và suy nghĩ của mình thôi nhé.

## Cách 1 : Vứt vào Static Service Helper.

Cách này rất phổ biến và tiện dụng, chúng ta tạo một class khác, gọi là service, hay bạn thích gọi là helper hay khỉ gió gì cũng đc, và class này nằm trong `service layer` của ứng dụng.

Okay, chúng ta tạo file ở **app/Services/ReportService.php**

```php
namespace App\Services;
// .... use ...
class ReportService {
  public static function getPersonalReport($id, $daterange)
  {
    // Cứ tin là mình chép và chỉnh sửa code từ controller vào đây để xử lý nha. 😂😂
    return $data;
  }
}
```

Bây giờ chúng ta chỉ cần call method này từ Controller :

```php
// ... use ...
use App\Services\ReportService;

class ReportController extends Controller
{
  public function personal($id, $daterange)
  {
    $data = ReportController::getPersonalReport($id, $daterange);
    return response()->json(
        $data,
        200,
        ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
        JSON_UNESCAPED_UNICODE
    );
  }
}
```

Giảm liền 15kg cho Controller, còn hơn là uống trà giảm cân Herbalife luôn nhé :)))

Điều hay ho của static method trước tiên đó là ta có thể gọi nó mà méo cần khởi tạo object.

### Khi nào thì dùng cách này?

Cách này nên dùng với những function đơn giản, không cần lưu trạng thái hoặc dữ liệu gì, vì chính điểm mạnh của static method cũng chính là điểm yếu : nó không khởi tạo object nào, nó chỉ được gọi 1 lần và méo lưu gì lại.

## Cách 2 : non-static method + create object with params.

```php
namespace App\Services;
// .... use ...
class ReportService {

  //public thôi, xoá static đi là được
  public function getPersonalReport($id, $daterange)
  {
    // Như trên hết trơn không thay đổi gì nghen!
  }
}
```

Ở Controller khi gọi method này chúng ta cần tạo một object.

```php
// ... use ...
use App\Services\ReportService;

class ReportController extends Controller
{
  public function personal($id, $daterange)
  {
    $data = (new ReportController->getPersonalReport($id, $daterange));
    return response()->json(
        $data,
        200,
        ['Content-Type' => 'application/json;charset=UTF-8', 'Charset' => 'utf-8'],
        JSON_UNESCAPED_UNICODE
    );
  }
}
```

**Ơ THẾ THÌ KHÁC MÉO GÌ STATIC METHOD ĐÂU? TẠO OBJECT LÀM GÌ CHO TỐN BỘ NHỚ?**

Bình tĩnh nào bạn êi ! Đây mới là đoạn sử dụng **_non-static method_** thôi, còn đoạn **_create object with params_** nữa.

Ví dụ tiếp nhé, nếu mình muốn trả về nhiều report theo năm thì sao?

Lúc này việc tạo object sẽ xuất hiện lợi điểm đầu tiên : ta có thể tái sử dụng object để call nhiều hàm sử dụng chung giá trị khởi tạo ban đầu. Ví dụ nhé :

```php
namespace App\Services;
// .... use ...
class YearlyReportService {

  private $year;

  public function __construct($year)
  {
      $this->year = $year;
  }

  public function getPersonalYearlySaleReport($id)
  {
    // Code xử lý bằng biến $id và $this->year
    return $data;
  }

  public function getPersonalYearlySaleAdminReport($id)
  {
    // Code xử lý bằng biến $id và $this->year
    return $data;
  }

  public function getAnOtherPersonalYearlyReport($id)
  {
    // Code xử lý bằng biến $id và $this->year
    return $data;
  }

}
```

Hơi mông lung đúng không? Đây đây, kết quả ở Controller sẽ như này :

```php
// ... use ...
use App\Services\YearlyReportService;

class ReportController extends Controller
{
  public function personal_yearly($id, $year = null)
  {
    $year = $year ? $year : date('Y');
    $reportService = new YearlyReportService($year);
    $saleReport = $reportService->getPersonalYearlySaleReport($id);
    $saleAdminReport = $reportService->getPersonalYearlySaleAdminReport($id);
    $anOtherReport = $reportService->getAnOtherPersonalYearlyReport($id);
    // Xuất dữ liệu ra thôi
  }
}
```

Trong ví dụ này, mọi method gọi từ `$reportService` object đều sử dụng một giá trị `$year` được khởi tạo ban đầu. Bây giờ ta không dùng được static method nữa, vì service bây giờ đã _"stateful"_ chứ không còn _"stateless"_ nữa và các method của service sẽ phụ thuộc vào state (year) này.

### Khi nào nên dùng cách này?

Chúng ta dùng cách này khi service có tham số và nhiều method trong service sử dụng tham số đó. Easy nhá. 😁

## Cách 3 : Dependency Injection

À thôi ~~mình lười quá rôi~~ bài cũng dài quá rồi, và đoạn về `Dependency Injection` cũng khá dài nên mình ~~ngại viết~~ hẹn các bạn ở phần sau nhá.

**~~Khổ, blog có ma nào xem đâu mà hẹn~~**

Bai Bai. 🖐🖐
