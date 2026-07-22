<div align="center">

# 🪐 Orbit Sub

**قالب شیشه‌ای صفحه‌ی اشتراک برای Marzban و PasarGuard**
**Glassmorphism subscription page template for Marzban & PasarGuard**

[![License: MIT](https://img.shields.io/badge/license-MIT-3B82F6.svg)](./LICENSE)
[![Marzban](https://img.shields.io/badge/Marzban-compatible-8B5CF6.svg)](https://github.com/Gozargah/Marzban)
[![PasarGuard](https://img.shields.io/badge/PasarGuard-compatible-06B6D4.svg)](https://github.com/PasarGuard/panel)
[![React](https://img.shields.io/badge/React-18-3B82F6.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-8B5CF6.svg)](https://vitejs.dev)

✨ پس‌زمینه‌ی کهکشانی متحرک · 📊 آمار زنده‌ی مصرف · 📋 کپی یک‌کلیکه‌ی کانفیگ‌ها
📱 QR Code · ⚡ افزودن سریع به اپلیکیشن

<br>

| نسخه | پوشه | زبان | جهت |
| :---: | :---: | :---: | :---: |
| 🇮🇷 فارسی | [`fa/`](./fa) | فارسی | RTL |
| 🇷🇺 روسی | [`ru/`](./ru) | Русский | LTR |

</div>

هر پوشه یک پروژه‌ی کاملاً مستقله — `package.json` جدا، build جدا، README
جدا. هیچ چیزی بین این دو مشترک نیست جز طراحی کلی. 🧩

---

## 🇮🇷 فارسی

### 🖼️ پیش‌نمایش

![پیش‌نمایش پنل اشتراک](./docs/screenshot-fa.png)

### ✨ ویژگی‌ها

- 🪟 **طراحی شیشه‌ای (Glassmorphism):** کارت‌های نیمه‌شفاف با بلور پس‌زمینه و
  درخشش آبی/بنفش هنگام هاور
- 🌌 **پس‌زمینه‌ی کهکشانی متحرک:** میدون ستاره‌ای با عمق و چشمک‌زدن، پیاده‌شده
  با Canvas (بدون وابستگی به WebGL سنگین)
- 🟢 **وضعیت زنده‌ی کاربر:** نام، وضعیت فعال/غیرفعال با نشانگر پالس، تاریخ
  انقضا (یا نامحدود)
- 📊 **نمودار مصرف حجم:** حلقه‌ی دایره‌ای انیمیشن‌دار برای مصرف‌شده/باقی‌مانده/کل
  (پشتیبانی کامل از حالت نامحدود)
- 🔗 **لینک اشتراک + QR:** با توضیح داخل صفحه که کاربر دقیقاً بدونه باهاش
  چیکار کنه
- ⚡ **افزودن سریع به اپلیکیشن:** دکمه‌ی مخصوص هرکدوم از Streisand، V2rayNG،
  V2Box، V2RayTun و Happ با deep link واقعی هر اپ + کپی خودکار لینک
- 📋 **لیست کانفیگ‌ها:** پرچم کشور (خودکار یا حدسی از remark)، کپی تکی و کپی
  همه با یه دکمه، QR جداگانه برای هر سرور، اسکرول با گرادیانت محو برای
  لیست‌های بلند
- 🔌 **یکپارچگی مستقیم با مرزبان:** بدون نیاز به API جدا؛ داده از طریق همون
  موتور Jinja2 خود مرزبان تزریق می‌شه
- ♿ **دسترس‌پذیری:** فوکوس کیبورد، `aria-label` روی همه‌ی دکمه‌ها، پشتیبانی
  از `prefers-reduced-motion`

### 📦 نصب دستی (Manual Install)

این پروژه به‌صورت **Subscription Page Template** برای Marzban و PasarGuard
ارائه می‌شود.

> [!IMPORTANT]
> به‌دلیل محدودیت GitHub Releases (که اجازه‌ی دو فایل هم‌نام نمی‌ده)،
> فایل‌های آماده با نام‌های `index-fa.html` و `index-ru.html` منتشر
> می‌شوند. مرزبان و PasarGuard فقط فایلی به اسم دقیق `index.html` را
> به‌صورت پیش‌فرض شناسایی می‌کنند. در نتیجه، فایل دانلودشده باید هنگام
> نصب به `index.html` تغییر نام داده شود. دستورات پایین این کار را
> خودکار (در همون خط دانلود) انجام می‌دهند.

#### 🔧 نصب روی Marzban

```bash
# 1. ساخت پوشه‌ی تمپلیت
sudo mkdir -p /var/lib/marzban/templates/subscription

# 2. دانلود تمپلیت فارسی و تغییر نام خودکار به index.html
sudo wget \
  https://github.com/1amirhoseiin1/orbit-sub/releases/latest/download/index-fa.html \
  -O /var/lib/marzban/templates/subscription/index.html

# 3. تنظیم مرزبان (اگه قبلاً تنظیم نشده)
echo 'CUSTOM_TEMPLATES_DIRECTORY="/var/lib/marzban/templates/"' | sudo tee -a /opt/marzban/.env
echo 'SUBSCRIPTION_PAGE_TEMPLATE="subscription/index.html"' | sudo tee -a /opt/marzban/.env

# 4. ری‌استارت مرزبان
marzban restart
```

#### 🔧 نصب روی PasarGuard

```bash
# 1. ساخت پوشه‌ی تمپلیت
sudo mkdir -p /var/lib/pasarguard/templates/subscription

# 2. دانلود تمپلیت فارسی و تغییر نام خودکار به index.html
sudo wget \
  https://github.com/1amirhoseiin1/orbit-sub/releases/latest/download/index-fa.html \
  -O /var/lib/pasarguard/templates/subscription/index.html

# 3. تنظیم PasarGuard در /opt/pasarguard/.env (اگه قبلاً تنظیم نشده)
echo 'CUSTOM_TEMPLATES_DIRECTORY="/var/lib/pasarguard/templates/"' | sudo tee -a /opt/pasarguard/.env
echo 'SUBSCRIPTION_PAGE_TEMPLATE="subscription/index.html"' | sudo tee -a /opt/pasarguard/.env

# 4. ری‌استارت PasarGuard
pasarguard restart
```

> [!TIP]
> اگر فایل را به‌صورت دستی دانلود یا آپلود می‌کنید (نه از طریق `wget`)،
> حتماً پیش از قرار دادن آن در مسیر تمپلیت، نام فایل را به `index.html`
> تغییر دهید.

> [!NOTE]
> این دو نسخه (`index-fa.html` و `index-ru.html`) برای دو کامیونیتی/سرور
> جدا هستند، نه یک نصب مشترک. اگر سرور شما برای کاربران فارسی‌زبان است،
> فقط فایل فارسی را دانلود کنید؛ برای کاربران روسی‌زبان، فقط فایل روسی.

### 🛠️ توسعه‌ی لوکال

```bash
cd fa
npm install
npm run dev      # سرور توسعه
npm run build    # خروجی تک‌فایلی در fa/dist/index.html
```


## 🇷🇺 English

### 🖼️ Preview

![Subscription panel preview](./docs/screenshot-ru.png)

### ✨ Features

- 🪟 **Glassmorphism UI:** translucent cards with backdrop blur and a
  blue/violet glow on hover
- 🌌 **Animated galaxy background:** a depth-aware, twinkling starfield
  rendered on Canvas (no heavy WebGL dependency)
- 🟢 **Live user status:** name, active/inactive with a pulse indicator,
  expiry date (or unlimited)
- 📊 **Usage chart:** animated circular ring for used/remaining/total data
  (fully supports unlimited plans)
- 🔗 **Subscription link + QR:** with inline copy explaining what it is
  and how to use it
- ⚡ **Quick-add to app:** one-tap buttons for Streisand, V2rayNG, V2Box,
  V2RayTun, and Happ using each app's real deep link scheme, plus
  automatic clipboard copy as a fallback
- 📋 **Config list:** country flags (auto-detected or guessed from the
  remark), single and bulk copy, per-server QR code, scrollable with a
  fade gradient for long lists
- 🔌 **Direct Marzban integration:** no separate API needed — data is
  injected through Marzban's own Jinja2 templating engine
- ♿ **Accessibility:** full keyboard focus support, `aria-label` on every
  button, respects `prefers-reduced-motion`

### 📦 Manual Install

This project is distributed as a **Subscription Page Template** for
Marzban and PasarGuard.

> [!IMPORTANT]
> GitHub Releases cannot contain two files with the same name, so the
> pre-built templates are published as `index-fa.html` and
> `index-ru.html`. Both Marzban and PasarGuard expect the template file
> to be named exactly `index.html`. The installation commands below
> rename the downloaded file automatically, in the same download step.

#### 🔧 Install on Marzban

```bash
# 1. Create the template directory
sudo mkdir -p /var/lib/marzban/templates/subscription

# 2. Download the Russian template and rename it to index.html
sudo wget \
  https://github.com/1amirhoseiin1/orbit-sub/releases/latest/download/index-ru.html \
  -O /var/lib/marzban/templates/subscription/index.html

# 3. Configure Marzban (if not already configured)
echo 'CUSTOM_TEMPLATES_DIRECTORY="/var/lib/marzban/templates/"' | sudo tee -a /opt/marzban/.env
echo 'SUBSCRIPTION_PAGE_TEMPLATE="subscription/index.html"' | sudo tee -a /opt/marzban/.env

# 4. Restart Marzban
marzban restart
```

#### 🔧 Install on PasarGuard

```bash
# 1. Create the template directory
sudo mkdir -p /var/lib/pasarguard/templates/subscription

# 2. Download the Russian template and rename it to index.html
sudo wget \
  https://github.com/1amirhoseiin1/orbit-sub/releases/latest/download/index-ru.html \
  -O /var/lib/pasarguard/templates/subscription/index.html

# 3. Configure PasarGuard in /opt/pasarguard/.env (if not already configured)
echo 'CUSTOM_TEMPLATES_DIRECTORY="/var/lib/pasarguard/templates/"' | sudo tee -a /opt/pasarguard/.env
echo 'SUBSCRIPTION_PAGE_TEMPLATE="subscription/index.html"' | sudo tee -a /opt/pasarguard/.env

# 4. Restart PasarGuard
pasarguard restart
```

> [!TIP]
> If you upload the template manually instead of using `wget`, rename it
> to `index.html` before placing it inside the template directory.

> [!NOTE]
> These two builds (`index-fa.html` and `index-ru.html`) are meant for
> two separate communities/servers, not one shared install. If your
> server serves Persian-speaking users, download only the Persian file;
> for Russian-speaking users, download only the Russian file.

### 🛠️ Local development

```bash
cd ru
npm install
npm run dev      # dev server
npm run build    # single-file output at ru/dist/index.html
```

Full details (project structure, API wiring, Marzban integration) are in
[`ru/README.md`](./ru/README.md). 📖

---

<div align="center">

## 📄 License

**MIT** — use, modify, and redistribute freely.

Made with 🩵 for the Marzban / PasarGuard community

</div>
