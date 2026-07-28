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
| Chạy tất cả (hiện browser) | `HEADED=true npx cucumber-js` |
| 1 feature theo tag | `HEADED=true npx cucumber-js --tags @task74-dynamic` |
| Nhiều tag | `HEADED=true npx cucumber-js --tags "@login-clean or @register-clean"` |
| Trừ tag ra | `HEADED=true npx cucumber-js --tags "not @task74-clean"` |
| Chạy ngầm | `npx cucumber-js` |
| Kiểm tra step thiếu (không mở browser) | `npx cucumber-js --dry-run` |

Bằng npm script:
```bash
npm run test:bdd:headed   # tất cả, hiện browser
npm run test:bdd:login    # chỉ @login-clean
```

### Danh sách tag
| Tag | Nội dung |
|---|---|
| `@login-clean` | Đăng nhập (6 case) |
| `@register-clean` | Đăng ký + email trùng |
| `@task52-clean` | Đăng ký → sửa profile → thêm địa chỉ → đổi mật khẩu → login lại |
| `@task72-clean` | Duyệt category + search + mini cart |
| `@task73-clean` | Sửa giỏ (đổi qty, xoá) + checkout |
| `@task74-dynamic` | Đặt đơn → bắt order code → re-order |
| `@task74-clean` | Bản migrate 1-1 (data-bound, chỉ `--dry-run`) |

---

## 3. Bộ cũ (`legacy/`) — bản gốc để đối chiếu

```bash
npx cucumber-js --config legacy/cucumber.js                  # BDD cũ
npx playwright test --config legacy/playwright.config.js     # spec cũ
```

Lưu ý: nhiều case cũ **data-bound** (account/đơn hàng cố định) nên có thể không chạy xanh.

---

## 4. Bảng đối chiếu BDD ↔ Spec

| Feature (BDD) | Spec (Playwright) | Nội dung |
|---|---|---|
| `login-clean.feature` | `tests/login.spec.js` | Đăng nhập |
| `register-clean.feature` | `tests/register.spec.js` | Đăng ký |
| `task52-clean.feature` | `tests/account.spec.js` | Quản lý tài khoản |
| `task72-clean.feature` | `tests/catalog.spec.js` | Catalog + mini cart |
| `task73-clean.feature` | `tests/cart-checkout.spec.js` | Giỏ hàng + checkout |
| `task74-dynamic.feature` | `tests/reorder.spec.js` | Đặt đơn + re-order |

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
