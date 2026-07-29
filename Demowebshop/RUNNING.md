# Hướng dẫn chạy test (quick reference)

> Ghi chú nhanh để tra lại khi quên lệnh. Mọi lệnh chạy từ thư mục `Demowebshop/`.
> Bản note gốc cũ vẫn giữ ở `legacy/tests/note`.

---

## 0. Chuẩn bị (chỉ làm 1 lần)

```bash
cd Demowebshop
npm install
npx playwright install
cp .env.example .env      # rồi điền DEMO_EMAIL / DEMO_PASSWORD
```

`.env` đang dùng tài khoản: `cuibap1@yopmail.com`.
File `storageState.json` (session đăng nhập) **tự sinh** ở lần chạy đầu — xoá đi nó tạo lại.

---

## ⚠️ Quy tắc data test: mọi thứ auto tạo ra phải có tiền tố `Au_`

Khai báo tại [`support/test-data.js`](support/test-data.js) — dùng chung cho cả spec lẫn BDD.

```js
const { au, uniqueEmail, TEST_USER } = require('./support/test-data');
au('Fsoft')      // -> "Au_Fsoft"
uniqueEmail()    // -> "Au_12345678@yopmail.com"
```

| Loại | Ví dụ |
|---|---|
| Email | `Au_12345678@yopmail.com` |
| Tên | `Au_Bap` / `Au_Nguyen` |
| Công ty / thành phố | `Au_Fsoft` / `Au_NhaTrang` |

**Không hardcode tên/email trần** trong spec hay `.feature` — luôn lấy từ `support/test-data.js`.
Nhờ marker này, script dọn data chỉ cần nhắm vào `Au_*` là không bao giờ đụng data người thật.

### Dọn data sau khi chạy
```bash
npm run cleanup          # xem sẽ xoá gì (dry-run, không đụng gì)
npm run cleanup:apply    # xoá thật (địa chỉ Au_ + giỏ hàng còn sót)
```
Script [`scripts/cleanup-test-data.js`](scripts/cleanup-test-data.js) có **chốt chặn production**
(`TEST_ENV=prod` là dừng) và sẵn khung `cleanupViaDatabase()` để cắm DB thật ở project sau
(cùng một chiến lược marker: `DELETE ... WHERE email LIKE 'Au_%'`).

---

## Tag phân tầng: `@smoke` vs `@regression`

| Tag | Dùng khi | Số lượng |
|---|---|---|
| `@smoke` | Cổng nhanh trước khi merge (~2 phút) | 3 |
| `@regression` | Chạy đầy đủ, ban đêm / trước release | 12 |

```bash
npm run test:smoke              # Playwright @smoke
npm run test:regression         # Playwright @regression
npm run test:bdd:smoke          # BDD @smoke
npm run test:bdd:regression     # BDD @regression
```

---

## 1. Playwright specs (`tests/`) — có hiện browser

| Mục đích | Lệnh |
|---|---|
| Chạy tất cả (hiện browser) | `npx playwright test --headed` |
| Chỉ nhóm guest (login/register/account) | `npx playwright test --project=guest --headed` |
| Chỉ nhóm loggedIn (catalog/cart/reorder) | `npx playwright test --project=loggedIn --headed` |
| 1 file | `npx playwright test tests/reorder.spec.js --headed` |
| 1 test theo tên | `npx playwright test -g "signs in with valid credentials" --headed` |
| Chạy ngầm (không hiện browser) | `npx playwright test` |
| Xem report sau khi chạy | `npx playwright show-report` |
| Chế độ UI (debug trực quan) | `npx playwright test --ui` |
| Debug từng bước | `npx playwright test tests/login.spec.js --debug` |

Bằng npm script:
```bash
npm run test:headed      # tất cả, hiện browser
npm run test:guest       # nhóm guest
npm run test:loggedin    # nhóm loggedIn
npm run report           # mở HTML report
```

---

## 2. BDD Cucumber (`features/`) — có hiện browser

Hiện browser bằng biến môi trường `HEADED=true`:

| Mục đích | Lệnh |
|---|---|
| Chạy tất cả (hiện browser) | `HEADED=true npx cucumber-js --tags "not @data-bound"` |
| 1 feature theo tag | `HEADED=true npx cucumber-js --tags @reorder` |
| Nhiều tag | `HEADED=true npx cucumber-js --tags "@login or @register"` |
| Trừ tag ra | `HEADED=true npx cucumber-js --tags "not @data-bound"` |
| Chạy ngầm | `npx cucumber-js` |
| Kiểm tra step thiếu (không mở browser) | `npx cucumber-js --dry-run` |

Bằng npm script:
```bash
npm run test:bdd:headed   # tất cả (trừ @data-bound), hiện browser
npm run test:bdd:smoke    # chỉ @smoke
```

### Danh sách tag

**Tag nghiệp vụ** (mỗi feature 1 tag, trùng tên file spec tương ứng)
| Tag | Nội dung |
|---|---|
| `@login` | Đăng nhập (6 case) |
| `@register` | Đăng ký + email trùng |
| `@account` | Đăng ký → sửa profile → thêm địa chỉ → đổi mật khẩu → login lại |
| `@catalog` | Duyệt category + search + mini cart |
| `@cart` | Sửa giỏ (đổi qty, xoá) + checkout |
| `@reorder` | Đặt đơn → bắt order code → re-order |
| `@order-details` | Bản migrate 1-1 từ case gốc (xem `@data-bound`) |

**Tag phân loại**
| Tag | Ý nghĩa |
|---|---|
| `@smoke` | Cổng nhanh trước merge (3 scenario) |
| `@regression` | Chạy đầy đủ (12 scenario) |
| `@data-bound` | Phụ thuộc data cố định (order lịch sử) → chỉ `--dry-run`, luôn loại khỏi lệnh chạy |
| `@guest` / `@loggedIn` | Chạy ở trạng thái chưa/đã đăng nhập (hooks tự xử lý) |

---

## 3. Bộ cũ (`legacy/`) — bản gốc để đối chiếu

```bash
npx cucumber-js --config legacy/cucumber.js                  # BDD cũ
npx playwright test --config legacy/playwright.config.js     # spec cũ
```

Lưu ý: nhiều case cũ **data-bound** (account/đơn hàng cố định) nên có thể không chạy xanh.

---

## 4. Bảng đối chiếu BDD ↔ Spec

Tên trùng nhau giữa 2 suite cho dễ tra:

| Feature (BDD) | Spec (Playwright) | Nội dung |
|---|---|---|
| `login.feature` | `tests/login.spec.js` | Đăng nhập |
| `register.feature` | `tests/register.spec.js` | Đăng ký |
| `account.feature` | `tests/account.spec.js` | Quản lý tài khoản |
| `catalog.feature` | `tests/catalog.spec.js` | Catalog + mini cart |
| `cart-checkout.feature` | `tests/cart-checkout.spec.js` | Giỏ hàng + checkout |
| `reorder.feature` | `tests/reorder.spec.js` | Đặt đơn + re-order |
| `order-details.feature` | *(không có)* | Bản migrate 1-1, `@data-bound` |

Cả hai đều dùng chung page object trong `pages/`.

---

## 5. Gặp lỗi thì làm gì

| Triệu chứng | Cách xử lý |
|---|---|
| Test loggedIn fail ngay bước đầu (không thấy account ở header) | Xoá `storageState.json` rồi chạy lại — nó sẽ đăng nhập lại từ `.env` |
| Báo thiếu `DEMO_EMAIL / DEMO_PASSWORD` | Chưa có `.env` — copy từ `.env.example` |
| Cucumber báo step `undefined` | Chạy `npx cucumber-js --dry-run` để xem step nào thiếu |
| Sai số tiền / tổng giỏ | Giỏ còn hàng cũ — các test đã tự `clearCart()`, chạy lại là sạch |
| Muốn xem lỗi trực quan | `npx playwright show-report` (có screenshot + video + trace khi fail) |
