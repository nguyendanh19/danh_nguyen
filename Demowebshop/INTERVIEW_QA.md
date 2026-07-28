# Bộ câu hỏi + câu trả lời — Interview QA Automation
**Danh Nguyen** · Playwright + Cucumber · Domain: Pharmacy · 2 vòng (VN + Texas)

> Câu trả lời dưới đây bám sát code thật trong repo của anh. Chỗ nào là điểm yếu thì có ghi rõ cách trả lời "an toàn" — không bịa.

---

# PHẦN 0 — Tự giới thiệu (mở màn cả 2 vòng)

**Q: Giới thiệu bản thân / kinh nghiệm của bạn.**

**Trả lời (VN):**
> "Em làm QA, hướng automation. Project gần nhất em tự build framework end-to-end cho một site e-commerce: Playwright + JavaScript, áp dụng Page Object Model, phủ cả UI lẫn API.
>
> Điểm em tâm đắc nhất không phải là viết được bao nhiêu test, mà là em đã **refactor lại toàn bộ**: bản đầu em viết theo kiểu một class Actions gom hết mọi thứ — gần 800 dòng, locator XPath, `waitForTimeout` rải khắp nơi. Sau đó em tách ra thành từng Page Object riêng theo màn hình, đổi sang locator theo góc nhìn người dùng (`getByLabel`, `getByRole`), bỏ hết sleep cứng và dùng web-first assertion của Playwright.
>
> Em vẫn giữ code cũ trong thư mục `legacy/` để đối chiếu — vì em nghĩ giá trị của QA automation nằm ở chỗ **maintain được lâu dài**, không phải chạy pass một lần."

**English version (vòng Texas):**
> "I'm a QA engineer focused on test automation. My most recent project is an end-to-end framework for an e-commerce site — Playwright with JavaScript, Page Object Model, covering both UI and API.
>
> What I'm most proud of isn't the test count — it's the refactor. My first version was a single 800-line 'Actions' class with XPath locators and hard-coded waits everywhere. I broke it into focused page objects per screen, switched to user-facing locators, and removed every fixed sleep in favor of Playwright's web-first assertions.
>
> I kept the old code in a `legacy/` folder for comparison, because I believe the real value of automation is maintainability, not a one-time green run."

**Tại sao câu này ăn điểm:** Hầu hết ứng viên kể "em biết Selenium, Playwright, Cucumber". Anh kể **một câu chuyện kỹ thuật có before/after** — đó là thứ interviewer nhớ.

---

# PHẦN 1 — VÒNG VN (Technical deep-dive)

## Q1. Kể về architecture project của bạn. Tại sao chọn thiết kế đó?

**Trả lời:**
> "Framework em chia 3 tầng:
>
> 1. **`features/`** — file `.feature` viết bằng Gherkin, mô tả hành vi theo ngôn ngữ nghiệp vụ. Ví dụ: `When I sign in with email "..." and password "..."`. Không có một dòng CSS class nào ở đây.
> 2. **`features/step-definitions/`** — step mỏng, mỗi feature một file. Nhiệm vụ duy nhất là gọi xuống page object. Có `common-clean.steps.js` cho step dùng chung.
> 3. **`pages/`** — Page Object Model. Mỗi màn hình một class: `LoginPage`, `RegisterPage`, `CatalogPage`, `ShoppingCartPage`, `CheckoutPage`, `AccountOrdersPage`... Tất cả extend `BasePage` — nơi chứa phần dùng chung như `goto()`, `expectTitle()`, `expectUrl()`.
>
> Nguyên tắc em theo: **locator chỉ tồn tại ở tầng pages**. Nếu UI đổi label nút Login, em sửa đúng 1 dòng trong `LoginPage.js`, không đụng tới feature hay step.
>
> Một điểm nữa: assertion em cũng để trong page object, dạng method `expectSignedInAs()`, `expectLoginError()`. Nhờ vậy step definition đọc như tiếng Anh, không lẫn `expect(page.locator(...))`."

**Nếu bị hỏi tiếp: "POM có nhược điểm gì không?"**
> "Có. Nó tạo ra nhiều file hơn, và với project nhỏ dưới ~20 test thì overhead nhiều hơn lợi ích. Ngoài ra nếu không kỷ luật thì page object dễ phình thành 'god object' — đúng cái lỗi em mắc ở bản đầu tiên. Nguyên tắc em tự đặt ra: một page object chỉ phục vụ **một màn hình**, và nếu nó vượt quá ~150 dòng thì phải tách component ra — em có file `pages/components.js` để chứa phần dùng lại như assert địa chỉ, assert tổng tiền."

---

## Q2. Tại sao Playwright mà không phải Selenium / Cypress?

**Trả lời:**
> "Em chọn Playwright vì 3 lý do cụ thể:
>
> **Auto-waiting và web-first assertion.** Đây là lý do lớn nhất. Trong Selenium em phải tự quản `WebDriverWait`, `ExpectedConditions`. Playwright thì `expect(locator).toBeVisible()` tự retry trong khoảng timeout. Code em hiện tại **không còn một dòng `waitForTimeout` nào** ở suite chính — đó là chỉ số em dùng để đo độ ổn định.
>
> **Đa trình duyệt thật.** Hook của em nhận biến môi trường `BROWSER` để chạy chromium / firefox / webkit — cùng một bộ code. Cypress thì WebKit hỗ trợ còn hạn chế.
>
> **Tooling debug.** Trace viewer của Playwright ghi lại network, DOM snapshot theo từng step. Khi test fail trên CI, em mở `trace.zip` là thấy đúng khoảnh khắc fail, không cần chạy lại local.
>
> Còn Selenium em không chê — nó thắng ở chỗ hỗ trợ browser cũ, grid trưởng thành, và ecosystem Java/C# lớn. Nếu team hiện tại đã có sẵn Selenium grid và người quen Java thì em sẽ không đề xuất đập đi làm lại."

---

## Q3. Tại sao dùng Cucumber? Nhiều team bảo BDD là overhead.

**Trả lời — và đây là câu trả lời trung thực, ăn điểm hơn là khen BDD:**
> "Em đồng ý là BDD dễ thành overhead. Nó **chỉ có giá trị khi thật sự có người non-technical đọc file feature** — BA, PO, hoặc khách hàng. Nếu chỉ có QA đọc với nhau thì Gherkin chỉ là một lớp indirection thừa, viết thẳng `test()` của Playwright còn nhanh hơn.
>
> Trong project em, em dùng Cucumber vì 2 thứ cụ thể:
> - **Tag-based execution**: `@login-clean`, `@task74-dynamic`, `@loggedIn`, `@guest`. Chạy `npx cucumber-js --tags @login-clean` là ra đúng bộ cần.
> - **Data Table**: truyền dữ liệu có cấu trúc thay vì một chuỗi tham số dài.
>
> Với dự án pharmacy sắp tới, em nghĩ BDD **có thể** đáng giá — vì domain có quy tắc nghiệp vụ mà QA không được tự suy diễn: tương tác thuốc, điều kiện kê đơn, tính co-pay bảo hiểm. Feature file viết bằng ngôn ngữ nghiệp vụ sẽ là chỗ để pharmacist hoặc BA xác nhận 'đúng, quy tắc là như vậy'. Nhưng em sẽ hỏi team trước, không áp đặt."

---

## Q4. Xử lý flaky test như thế nào?

**Trả lời:**
> "Em chia flaky làm 4 nhóm nguyên nhân, mỗi nhóm cách xử khác nhau:
>
> **1. Timing / race condition** — nhóm phổ biến nhất. Cách chữa gốc là bỏ sleep cứng, dùng web-first assertion. Trong suite chính của em hiện không còn `waitForTimeout`. *(Thành thật: trong hook tạo storageState lần đầu em vẫn còn một `waitForTimeout(3000)` — em biết đó là nợ kỹ thuật, cần đổi thành `waitForURL` hoặc chờ phần tử header xuất hiện.)*
>
> **2. Test phụ thuộc nhau / dữ liệu bẩn** — test A tạo user, test B giả định user đó tồn tại. Em chống bằng cách mỗi test tự tạo dữ liệu riêng — em dùng `@faker-js/faker` và `unique-username-generator` để sinh email/username không trùng.
>
> **3. State rò rỉ giữa các test** — hook `Before`/`After` của em tạo browser context mới cho từng scenario và đóng sạch sau đó, nên không có cookie/localStorage rớt lại.
>
> **4. Môi trường / hạ tầng** — mạng chậm, service chưa sẵn sàng. Cái này retry là hợp lý.
>
> Quan điểm của em: **retry để giữ pipeline xanh, nhưng phải log lại**. Test nào retry mới pass thì vẫn phải điều tra. Nếu cứ retry mà không nhìn lại thì đến lúc nó che mất bug thật."

---

## Q5. Chiến lược API testing của bạn?

**Trả lời (bám vào code thật):**
> "Em có làm API testing bằng `request` context của Playwright. Ví dụ cụ thể trong project:
>
> **Ca khó nhất em gặp là login qua API của site này** — nó dùng ASP.NET với anti-forgery token. Không thể POST thẳng vào `/login`. Em phải:
> 1. `GET /login` để lấy HTML và cookie
> 2. Parse `__RequestVerificationToken` ra khỏi HTML bằng regex
> 3. POST kèm token + cookie đó, content-type `x-www-form-urlencoded`
>
> Em viết nó dạng data-driven: đọc từ `loginApiData.json`, loop qua từng case, mỗi case có `description` và `expectedStatus`.
>
> Ngoài ra em có test API riêng cho một site khác dùng Bearer token, verify status code, verify schema của response body.
>
> **Chỗ em muốn cải thiện:** hiện API test và UI test đang là 2 suite tách rời. Hướng em muốn làm là **dùng API để setup state cho UI test** — ví dụ tạo user và đổ sẵn giỏ hàng qua API, rồi UI test chỉ tập trung test đúng bước checkout. Như vậy test vừa nhanh vừa ít điểm gãy."

**Nếu hỏi: "Tại sao chưa làm?"**
> "Vì site demo em dùng không có API công khai đầy đủ cho các thao tác đó. Trong môi trường thật có API nội bộ thì em sẽ làm ngay từ đầu."

---

## Q6. Quản lý test data như thế nào?

**Trả lời:**
> "Em dùng 3 hướng, tuỳ loại test:
>
> **Dữ liệu sinh động (dynamic)** — `@faker-js/faker` + `unique-username-generator` cho luồng đăng ký. Mỗi lần chạy là một user mới, không bao giờ đụng 'email đã tồn tại'.
>
> **Dữ liệu cố định (fixture)** — JSON và CSV cho các bộ data-driven. Em có `utils/csvHelper.js` đọc CSV bằng `csv-parse/sync`, trả về mảng object theo header. Cùng một luồng login em chạy được với cả file JSON lẫn CSV.
>
> **Secret** — tất cả credential nằm trong `.env`, có `.env.example` để người khác biết cần biến gì, và `.env` thì gitignore. Không hardcode password vào repo.
>
> **Session reuse** — em có cơ chế đăng nhập một lần rồi lưu `storageState.json`. Scenario nào gắn tag `@loggedIn` thì nạp lại state đó, khỏi phải login lại từ UI. Tiết kiệm khá nhiều thời gian chạy.
>
> **Chỗ em còn thiếu:** chưa có bước cleanup tự động — user test tạo ra vẫn nằm lại trên site. Với hệ thống thật em sẽ cần script teardown hoặc reset DB giữa các lần chạy. Em có dùng `mssql` trong project để query DB verify dữ liệu, nên hướng seed/cleanup qua DB là khả thi."

---

## Q7. Nếu test fail, bạn debug thế nào?

**Trả lời:**
> "Quy trình em làm:
>
> 1. **Đọc lỗi trước.** Web-first assertion của Playwright báo rõ nó chờ cái gì, thấy cái gì. Nhiều khi đọc message là đủ hiểu.
> 2. **Xác định là bug hay là flaky.** Chạy lại một mình test đó. Pass → nghi flaky hoặc phụ thuộc test khác. Fail lại → nhiều khả năng bug thật.
> 3. **Mở trace.** Trace viewer cho xem DOM snapshot ở từng step, network request, console log. Đây là công cụ chính khi fail trên CI mà không tái hiện được ở local.
> 4. **Chạy headed.** Em có sẵn script `npm run test:headed` — dùng `cross-env HEADED=true` để bật browser lên nhìn tận mắt.
> 5. **Thu hẹp phạm vi.** Chạy đúng tag đó thôi: `npx cucumber-js --tags @task74-dynamic`.
>
> Nguyên tắc em tự nhắc: **không bao giờ 'sửa' flaky bằng cách tăng timeout**. Tăng timeout là giấu vấn đề, không phải giải quyết."

---

## Q8. Test pyramid của bạn ra sao? Bao nhiêu UI / API / unit?

**Trả lời:**
> "Về lý thuyết thì pyramid chuẩn là nhiều unit ở dưới, ít UI ở trên. Nhưng em nói thật về vị trí của em: **QA automation thường không sở hữu tầng unit test** — đó là của dev. Nên em không nhận là em làm 70% unit.
>
> Cái em kiểm soát được là tỉ lệ **API vs UI**, và nguyên tắc của em là:
> - Logic nghiệp vụ, tính toán, validate → test ở tầng **API**. Nhanh, ổn định, thất bại thì chỉ đúng một nguyên nhân.
> - Luồng người dùng đi xuyên nhiều màn hình → test ở tầng **UI**, nhưng chỉ giữ những luồng thật sự quan trọng.
>
> Ví dụ với pharmacy: quy tắc 'thuốc A và thuốc B tương tác, phải cảnh báo' — em test ở API, và test hết mọi tổ hợp. Còn UI thì em chỉ cần 1 test xác nhận cảnh báo đó hiện ra đúng chỗ và chặn được nút submit. Không cần chạy 50 tổ hợp qua UI.
>
> Và em sẽ nói với dev: nếu chỗ nào chỉ unit test được, em sẽ đề xuất chứ không tự đi viết E2E để bù."

---

## Q9. CI/CD — bạn tích hợp automation vào pipeline thế nào?

**Trả lời trung thực (đây là gap của anh — trả lời kiểu này an toàn hơn là bịa):**
> "Project hiện tại của em chạy local, em **chưa dựng pipeline hoàn chỉnh** — em nói thẳng chỗ này. Nhưng em đã chuẩn bị sẵn những thứ để lên CI không phải sửa nhiều:
> - Mọi config chạy qua biến môi trường (`BROWSER`, `HEADED`, credential trong `.env`) → trên CI chỉ cần đổi secret, không sửa code.
> - Mặc định headless.
> - Script npm rõ ràng, tách theo mục đích.
>
> Nếu được giao dựng CI, hướng em làm với GitHub Actions:
> - **Trigger:** smoke suite chạy mỗi PR; full regression chạy nightly. Không chạy full mọi commit — chậm, dev sẽ bắt đầu ignore kết quả.
> - **Artifact:** upload trace, screenshot, video khi fail. Đây là thứ quyết định CI có dùng được hay không — fail mà không có bằng chứng thì không ai debug nổi.
> - **Parallel:** shard theo file, Playwright hỗ trợ sẵn.
> - **Report:** HTML report publish ra chỗ ai cũng xem được.
> - **Gate:** smoke fail thì block merge; regression fail thì tạo ticket, không block.
>
> Em muốn nói rõ: em chưa vận hành CI ở quy mô production, nhưng em hiểu nó cần gì và học được nhanh."

---

## Q10. Làm sao đo được automation của bạn có giá trị? Metric nào?

**Trả lời:**
> "Em tránh metric 'số lượng test case' — nó khuyến khích viết nhiều test vô nghĩa. Metric em thấy đúng:
>
> 1. **Escaped defects** — bao nhiêu bug lọt lên production mà lẽ ra automation phải bắt được. Đây là metric thật sự đo giá trị.
> 2. **Tỉ lệ flaky** — % test phải retry mới pass. Cao thì team mất niềm tin, và một suite không ai tin thì bằng không.
> 3. **Thời gian chạy** — feedback loop. Smoke nên dưới 10 phút, nếu không dev sẽ merge trước khi có kết quả.
> 4. **Coverage theo luồng nghiệp vụ, không theo dòng code** — 'checkout đã phủ chưa', 'kê đơn đã phủ chưa' — chứ không phải '82% line coverage'.
> 5. **Thời gian sửa test khi UI đổi** — đo trực tiếp chất lượng thiết kế framework. Nhờ POM, đổi label nút login là sửa 1 dòng."

---

## Q11. Bạn từng tìm ra bug nào đáng nhớ bằng automation chưa?

**Cách trả lời — chọn 1 trong 3 hướng dưới, kể theo cấu trúc: bối cảnh → phát hiện → tác động:**

Hướng 1 (nếu anh có bug thật, ưu tiên dùng):
> "..." *(anh điền — kể càng cụ thể càng tốt: bug gì, tìm ra sao, nếu lọt production thì hậu quả gì)*

Hướng 2 (nếu chưa có bug production, dùng chính trải nghiệm refactor):
> "Bug lớn nhất em tìm ra thực ra là **trong chính bộ test của em**. Bản đầu em rải `waitForTimeout` khắp nơi, suite pass. Nhưng khi em bỏ hết sleep và đổi sang web-first assertion, có mấy test bắt đầu fail — hoá ra trước đó chúng **pass do may mắn về timing**, không phải do app đúng. Bài học của em: một test pass chưa chắc là một test tốt, và sleep cứng thì che lỗi chứ không chống lỗi."

Hướng 3 (từ ca API login):
> "Khi làm API test cho luồng login, em phát hiện phải xử lý anti-forgery token thì mới POST được. Cái đó dẫn em tới câu hỏi bảo mật: nếu token này không được validate đúng thì luồng login sẽ hở CSRF. Em thêm case verify rằng token sai / thiếu token thì server phải từ chối."

---

## Q12. Ngôn ngữ thì sao — bên tôi có thể dùng Java/C#/Python, bạn ổn không?

**Trả lời (câu này gần như chắc chắn được hỏi vì họ chưa chốt language):**
> "Em ổn. Hiện em mạnh nhất JavaScript vì project em làm bằng JS, nhưng em nghĩ **thứ chuyển được giữa các ngôn ngữ là tư duy thiết kế, không phải cú pháp** — Page Object Model, tách locator khỏi logic, web-first assertion, quản lý test data, những cái đó giống nhau ở mọi stack.
>
> Playwright có binding chính thức cho Python, Java, .NET với API gần như giống hệt. Nếu team dùng Python thì `page.get_by_label()` thay vì `page.getByLabel()` — cùng một khái niệm. Cucumber cũng có Behave (Python), SpecFlow/Reqnroll (.NET), Cucumber-JVM (Java).
>
> Em cần khoảng 1–2 tuần để trôi chảy cú pháp và ecosystem của ngôn ngữ mới. Anh/chị đã có định hướng ngôn ngữ chưa? Em muốn chuẩn bị trước."

**Mẹo:** kết bằng câu hỏi ngược — vừa thể hiện chủ động, vừa moi được thông tin.

---

## Q13. Bạn làm một mình thì quản lý công việc thế nào?

**Trả lời:**
> "Em xác định làm một mình thì rủi ro lớn nhất là **em trở thành điểm nghẽn duy nhất** — không ai biết framework chạy ra sao ngoài em. Nên em ưu tiên 3 thứ:
>
> 1. **Viết tài liệu ngay từ đầu.** Repo của em có README mô tả cấu trúc thư mục, cách cài, bảng liệt kê từng lệnh chạy cái gì. Người mới clone về là chạy được, không cần hỏi em.
> 2. **Code phải đọc được.** Em comment giải thích *tại sao* chứ không phải *cái gì*. Trong `LoginPage.js` em ghi rõ vì sao dùng `getByLabel` thay vì XPath.
> 3. **Ưu tiên rõ ràng.** Một mình thì không thể phủ hết. Em phủ luồng doanh thu và luồng rủi ro pháp lý trước, phần cosmetic để sau.
>
> Và em sẽ chủ động báo cáo đều — mỗi tuần một bản ngắn: đã phủ gì, tìm được bug gì, đang tắc ở đâu. Làm một mình mà im lặng thì stakeholder sẽ nghĩ QA không tạo ra giá trị."

---

# PHẦN 2 — VÒNG TEXAS (Case study, tiếng Anh)

> Vòng này thiên về **tư duy và giao tiếp**, ít code hơn. Dưới đây có cả bản tiếng Anh để anh đọc thành tiếng luyện trước.

## Q14. "Design a QA automation strategy for our pharmacy platform. You're the only QA engineer."

**English answer:**
> "Before I propose anything, I'd want to ask three questions: what's already covered by manual testing, which integrations are real versus mocked in the test environment, and what the release cadence is. But let me give you my default plan assuming a typical setup.
>
> **First, I'd prioritize by risk, not by feature list.** In pharmacy, the risk isn't evenly distributed. A broken product image is cosmetic. A wrong dosage displayed, a missed drug-interaction warning, or an incorrect insurance co-pay is a patient-safety and compliance problem. So my coverage order is: prescription and drug-safety logic first, payment and pricing second, then core commerce flows, then everything else.
>
> **Weeks 1–2 — Foundation.** Set up the framework and CI, and write three end-to-end tests that prove the pipeline works: log in, add a product, complete a checkout. The goal here isn't coverage, it's a working feedback loop.
>
> **Weeks 3–4 — Core commerce.** Authentication, catalog, cart, checkout. These are stable, high-traffic paths and they give the fastest return.
>
> **Weeks 5–6 — Pharmacy-specific.** Prescription upload and verification, drug-interaction warnings, age-restricted items, insurance co-pay calculation. Most of this I'd test at the API layer, because the logic matters more than the rendering, and API tests let me cover far more combinations.
>
> **Weeks 7–8 — Hardening.** Fix flakiness, add parallel execution, set up reporting that non-QA people actually read.
>
> **On tooling** — I'd default to Playwright because it's free, fast, and supports every browser, which keeps the budget on my time rather than licenses. The one place I might spend money is visual regression, if the pricing and dosage displays need pixel-level verification.
>
> **The risk I'd flag upfront:** with one QA engineer, I can't cover everything. I'd rather have forty tests that are trusted than four hundred that people ignore. So I'd agree on the risk priorities with you early, and be explicit about what is *not* covered."

**Bản tiếng Việt (nếu vòng VN cũng hỏi case study):**
> Ưu tiên theo rủi ro chứ không theo danh sách tính năng. Pharmacy thì rủi ro không đều nhau — ảnh sản phẩm lỗi là chuyện nhỏ, nhưng hiển thị sai liều, bỏ sót cảnh báo tương tác thuốc, hay tính sai co-pay bảo hiểm là vấn đề an toàn bệnh nhân và tuân thủ pháp lý. Nên thứ tự phủ của em: logic kê đơn và an toàn thuốc trước, thanh toán và giá thứ hai, luồng thương mại cơ bản thứ ba, còn lại sau cùng.
> Tuần 1–2 dựng nền và CI, viết 3 test chứng minh pipeline chạy được. Tuần 3–4 phủ luồng thương mại lõi. Tuần 5–6 phủ phần đặc thù pharmacy, chủ yếu ở tầng API. Tuần 7–8 xử flaky, chạy song song, làm report.
> Rủi ro em nêu trước: một mình thì không phủ hết được. Em thà có 40 test được tin tưởng còn hơn 400 test không ai đọc.

---

## Q15. "What's different about testing a pharmacy platform versus regular e-commerce?"

**English answer:**
> "Three things change fundamentally.
>
> **First, correctness has a different cost.** In regular e-commerce, a bug costs a sale. Here, a bug involving dosage, drug interactions, or allergy warnings can harm a patient. That changes how I weight test priorities and how much I'm willing to rely on a single test for a critical path.
>
> **Second, there are rules the QA team cannot invent.** Which drugs interact, which require a prescription, which are age-restricted, how insurance co-pay is calculated — I can't derive these from the UI. I need a source of truth, whether that's a pharmacist, a BA, or a regulatory document. This is actually where I'd argue BDD earns its keep: a Gherkin feature file written in business language is something a pharmacist can read and confirm.
>
> **Third, compliance affects test data itself.** With HIPAA, I can't copy production data into a test environment. That means I need a synthetic data strategy from day one, and audit trails become something I test rather than something I ignore.
>
> There's also a practical one: inventory and insurance integrations are usually third-party. I'd want them mocked in the test environment for determinism, plus a small set of contract tests against the real service so we catch it when their API changes."

---

## Q16. "How would you use AI in your testing?"

**English answer:**
> "I'd use it in three places, and I'd be careful about a fourth.
>
> **Test case generation from requirements.** Give an LLM a requirement — 'a customer must not be able to order a prescription drug without a valid prescription' — and it will produce a list of scenarios, including edge cases a human might skip: expired prescription, prescription for a different person, prescription for a different dosage. I treat that output as a *draft*. A human reviews it, cuts what's wrong, and only then does it get committed.
>
> **Test data synthesis.** This is a strong fit for pharmacy, because I can't use real patient data. An LLM can generate realistic synthetic patient records, prescriptions, and insurance profiles that exercise edge cases without touching PHI.
>
> **Failure triage.** When twenty tests fail overnight, an LLM can cluster them — 'these fifteen share a selector that no longer exists, these five are genuine assertion failures.' That turns an hour of reading logs into a few minutes.
>
> **The one I'd be cautious about is self-healing locators** — where AI automatically picks a new selector when the old one breaks. It sounds great, but a test that silently repairs itself can also silently stop testing what it was supposed to test. If a login button disappears entirely and the AI 'helpfully' finds a different button, the test passes and the bug ships. I'd want it to raise a flag for review, not fix things silently.
>
> **The general rule I'd apply: AI drafts, humans approve.** Especially in a regulated domain, I want a person accountable for every test that gates a release."

**Bản tiếng Việt rút gọn:**
> Em dùng AI ở 3 chỗ: sinh nháp test case từ yêu cầu, sinh dữ liệu test tổng hợp (rất hợp với pharmacy vì không được dùng dữ liệu bệnh nhân thật), và phân loại lỗi khi nhiều test fail cùng lúc.
> Chỗ em thận trọng là self-healing locator — test tự sửa selector nghe hay nhưng nguy hiểm: nếu nút Login biến mất mà AI tìm đại nút khác thì test vẫn pass, bug vẫn lọt. Em muốn nó báo để người xem, không tự sửa im lặng.
> Nguyên tắc chung: **AI viết nháp, người duyệt.** Nhất là trong domain có quy định pháp lý, mỗi test chặn release phải có người chịu trách nhiệm.

---

## Q17. "How do you work with developers when you find a bug?"

**English answer:**
> "I try to make the bug as cheap as possible for the developer to act on. That means a reproducible case, the smallest steps to trigger it, and evidence attached — for me that's usually a Playwright trace, which shows the network calls and the DOM state at the moment of failure. A developer can open it and see what I saw without re-running anything.
>
> I also try to state impact rather than severity. 'This blocks checkout for customers using a saved address' is more useful than 'Priority 1.'
>
> And when I'm wrong — when it turns out to be my test rather than their code — I say so quickly and publicly. That's what buys credibility for the next time I raise something."

---

## Q18. "Where do you want to grow?"

**English answer:**
> "Two areas. The first is CI/CD and infrastructure — I've built the framework but I haven't run automation at production scale in a pipeline, and that's the gap I most want to close. The second is domain depth. I've worked on generic e-commerce; pharmacy has rules I'd need to learn properly, and I think a QA engineer who understands the domain finds a different class of bug than one who only knows the tooling."

---

# PHẦN 3 — CÂU HỎI KHÓ / BẪY

## Q19. "Test của bạn chạy bao lâu? Có bao nhiêu test case?"

**Đừng bịa số.** Trước buổi phỏng vấn anh chạy `npm test` và ghi lại số thật.
> "Suite hiện tại có [X] scenario, chạy headless hết khoảng [Y] phút trên máy em. Em chưa bật parallel — đó là việc tiếp theo em định làm, Playwright hỗ trợ shard sẵn nên chủ yếu là cấu hình."

---

## Q20. "Sao trong hook của bạn vẫn còn waitForTimeout(3000)?"

**Nếu họ đọc code kỹ, câu này rất dễ bị hỏi. Trả lời thẳng:**
> "Đúng, chỗ đó em còn sót — trong bước tạo `storageState` lần đầu. Em biết cách sửa: thay bằng `waitForURL` hoặc chờ link account xuất hiện ở header. Em để lại vì nó chỉ chạy một lần khi chưa có file state, nhưng đó là lý do biện minh chứ không phải lý do đúng. Trong code review em sẽ không cho qua chỗ này."

**Tại sao trả lời vậy lại tốt:** thừa nhận + biết cách sửa + không đổ lỗi = dấu hiệu của người senior. Chống chế mới là điểm trừ.

---

## Q21. "BASE_URL của bạn hardcode trong BasePage. Đổi môi trường thì sao?"

**Trả lời:**
> "Đúng, hiện em hardcode vì chỉ có một môi trường demo. Với hệ thống thật có dev/staging/prod thì em sẽ đọc từ biến môi trường, kiểu `process.env.BASE_URL`, và có file config cho từng env. Em đã làm sẵn cơ chế `.env` cho credential rồi nên mở rộng cho URL là cùng một pattern."

---

## Q22. "Bạn không có visual testing, accessibility testing. Tại sao?"

**Trả lời:**
> "Em chưa làm, và em không muốn nói là em có kinh nghiệm ở đó. Em hiểu khái niệm: visual regression thì có Percy, Applitools, hoặc `toHaveScreenshot()` có sẵn trong Playwright; accessibility thì có `axe-playwright` để check WCAG.
>
> Với pharmacy em nghĩ cả hai đều đáng cân nhắc — accessibility đặc biệt, vì người dùng có thể là người cao tuổi hoặc có hạn chế về thị lực, và ở Mỹ còn có yếu tố pháp lý về ADA. Nếu vào team em sẽ đề xuất bắt đầu bằng `axe` cho các trang chính vì nó rẻ và tích hợp nhanh."

---

## Q23. "Nếu dev bảo test của bạn sai chứ không phải code họ sai?"

**Trả lời:**
> "Thì em đi kiểm tra trước khi tranh luận. Phần lớn trường hợp một trong hai bên hiểu sai yêu cầu, chứ không phải ai đó cẩu thả.
>
> Cách em xử: mở trace ra xem cụ thể app làm gì, đối chiếu với acceptance criteria. Nếu criteria mơ hồ thì đó mới là vấn đề gốc — em kéo BA/PO vào chốt lại, và sau đó viết luôn thành feature file để lần sau không cãi nhau nữa.
>
> Nếu test em sai thật thì em sửa và nói rõ. Em không muốn giữ thể diện bằng cách để một test sai tồn tại — nó sẽ tốn thời gian của cả team về sau."

---

## Q24. "Tại sao bạn rời công ty cũ / tại sao muốn vị trí này?"

**Khung trả lời (anh điền chi tiết cá nhân, nhưng giữ hướng tích cực):**
> "Em muốn làm ở nơi automation là một phần của quy trình chứ không phải việc làm thêm. Vị trí này hấp dẫn với em vì hai điểm: một là em được xây framework từ đầu và tự chịu trách nhiệm về nó, hai là domain pharmacy có ràng buộc thật — chất lượng ở đây có hậu quả rõ ràng, không chỉ là chuyện đẹp xấu. Em thấy đó là môi trường để lớn nhanh."

**Tuyệt đối không:** chê công ty cũ, chê đồng nghiệp cũ, nói "vì lương cao hơn" như lý do chính.

---

## Q25. "Mức lương mong muốn?"

**Bối cảnh anh: ~$1k/tháng fulltime đã được nhắc tới.**

**Trả lời:**
> "Em có nghe qua mức khoảng $1,000 cho vị trí fulltime này và em thấy nằm trong khoảng em có thể làm việc được. Em muốn hỏi thêm về phạm vi công việc — em sẽ là người duy nhất làm automation, hay có QA manual đi cùng? Và có bao gồm cả việc dựng CI/CD không? Vì phạm vi ảnh hưởng tới con số.
>
> Nếu đúng là em sở hữu toàn bộ automation từ đầu tới cuối, em nghĩ [khoảng anh muốn] là hợp lý. Nhưng em cũng quan tâm tới việc có review lại sau 3–6 tháng khi đã thấy kết quả cụ thể."

**Nguyên tắc:** đừng đưa con số đầu tiên nếu tránh được. Hỏi ngược về scope trước — vừa có thêm thông tin, vừa cho thấy anh nghĩ về giá trị công việc chứ không chỉ về tiền.

---

# PHẦN 4 — CÂU HỎI ANH NÊN HỎI HỌ

Hỏi 3–4 câu, đừng hỏi hết:

1. **"Hiện tại đang test thế nào? Manual hoàn toàn hay đã có automation?"** — biết mình vào để xây mới hay kế thừa.
2. **"Định hướng ngôn ngữ / stack đã chốt chưa?"** — họ đang chưa chốt, hỏi thẳng.
3. **"Ai sẽ đọc kết quả test? Dev, PO, hay khách hàng?"** — quyết định có nên dùng BDD hay không.
4. **"Các tích hợp bên thứ ba (bảo hiểm, thanh toán, kho thuốc) trong môi trường test là thật hay mock?"** — câu này rất "domain-aware", gây ấn tượng mạnh.
5. **"Có cần test mobile app không hay chỉ web?"**
6. **"Nếu 6 tháng nữa nhìn lại và thấy việc tuyển vị trí này là thành công, thì lúc đó điều gì đã xảy ra?"** — câu kết rất mạnh, buộc họ nói ra kỳ vọng thật.

---

# PHẦN 5 — CHECKLIST TRƯỚC NGÀY PHỎNG VẤN

- [ ] Chạy `npm test` — ghi lại **số scenario thật** và **thời gian chạy thật**
- [ ] Chạy `npm run test:headed` một lần cho chắc là không lỗi môi trường
- [ ] Mở sẵn tab: `pages/LoginPage.js`, `features/login-clean.feature`, `features/support/hooks.js`, `legacy/tests/loginapi.spec.js` — 4 file này đủ kể hết câu chuyện
- [ ] Chuẩn bị so sánh: mở `legacy/` cạnh `pages/` để show before/after refactor
- [ ] Sửa hoặc ít nhất **biết trước** về `waitForTimeout(3000)` trong hook
- [ ] Đọc lướt: https://playwright.dev/docs/best-practices
- [ ] Luyện nói to phần tiếng Anh (Q14, Q15, Q16) — ít nhất 2 lần
- [ ] Chuẩn bị 1 câu chuyện bug cụ thể (Q11)
- [ ] Ghi sẵn 4 câu hỏi sẽ hỏi họ

---

# PHẦN 6 — 5 THÔNG ĐIỆP CẦN TRUYỀN ĐẠT

Dù họ hỏi gì, cố gắng để 5 ý này lọt được vào cuộc nói chuyện:

1. **"Em từng viết code tệ và tự refactor lại"** — chứng minh khả năng tự đánh giá.
2. **"Em bỏ hết sleep cứng"** — dấu hiệu nhận biết người thật sự hiểu automation.
3. **"Em ưu tiên theo rủi ro, không theo danh sách tính năng"** — tư duy chiến lược.
4. **"Em thà có 40 test được tin tưởng hơn 400 test bị ignore"** — hiểu giá trị thật.
5. **"AI viết nháp, người duyệt"** — quan điểm chín chắn về AI, không hype cũng không bài xích.

---

**Điểm mạnh lớn nhất của anh trong buổi này không phải là số lượng test — mà là anh có một câu chuyện refactor rõ ràng, có before/after nhìn thấy được. Rất ít ứng viên có thứ đó. Dùng nó.**
