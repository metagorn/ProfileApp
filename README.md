# ProfileApp (Expo + Expo Router)

แอปพลิเคชัน React Native ที่สร้างด้วย Expo Route## การใช้งานแอป

- เปิดครั้งแรก: จะถูกเปลี่ยนเส้นทางไปหน้า Login หากยังไม่ได้ยืนยันตัวตน
- สมัครสมาชิก: ต้องใส่ username, email, password (เฉพาะฟิลด์ที่ API ต้องการ)
- เข้าสู่ระบบ: email, password
- หนังสือ:
  - รายการ: ค้นหา, แบ่งหน้า, แตะการ์ดเพื่อดูรายละเอียด
  - สร้าง: แตะ "+ New" ในรายการ
  - แก้ไข/ลบ: จากหน้ารายละเอียด
  - หลังสร้าง/อัปเดต/ลบ รายการจะรีเฟรชอัตโนมัติ
- Token หมดอายุ: หากเซิร์ฟเวอร์ตอบ 401 จะแจ้งเตือนและเปลี่ยนเส้นทางไปหน้า Loginปรไฟล์ ระบบธีม การยืนยันตัวตนผ่าน Classroom API และระบบจัดการหนังสือครบวงจร (ดู รายละเอียด สร้าง แก้ไข ลบ) พร้อมการรีเฟรชอัตโนมัติ

## ฟีเจอร์

- ระบบธีม
  - โหมดสว่าง/มืดผ่าน `ThemeProvider` ใน `context/AppTheme.js`
  - ปุ่มเปลี่ยนธีมบน header ทุกหน้าจอ
- ระบบยืนยันตัวตน
  - สมัครสมาชิก (username, email, password) และเข้าสู่ระบบ (email, password)
  - เก็บ Token อย่างปลอดภัยผ่าน `expo-secure-store`
  - โหลดโปรไฟล์ด้วย `/api/auth/profile`
  - ออกจากระบบอัตโนมัติและแจ้งเตือนเมื่อ token หมดอายุ (401)
- ระบบจัดการหนังสือ (CRUD)
  - รายการพร้อมค้นหาและแบ่งหน้า
  - หน้ารายละเอียดพร้อมปุ่มแก้ไข/ลบ
  - ฟอร์มสร้าง/แก้ไขใช้เฉพาะฟิลด์ที่ API อนุญาต
  - รีเฟรชอัตโนมัติหลังสร้าง/อัปเดต/ลบ (event bus + focus reload)
- การนำทาง
  - `expo-router` stack พร้อมป้องกันหน้าจอด้วย `<Redirect />` เมื่อไม่ได้ยืนยันตัวตน

## เทคโนโลยีที่ใช้

- Expo SDK 53, Expo Router ~5
- React Native 0.79, React 19
- `expo-secure-store` สำหรับเก็บ token

หมายเหตุ: React 19 กับ Expo SDK 53 อาจไม่ใช่การจับคู่ที่แนะนำอย่างเป็นทางการสำหรับทุกเทมเพลต หากพบปัญหาความเข้ากันได้ ให้ปรับเวอร์ชัน React ตามที่ Expo SDK 53 แนะนำ

## โครงสร้างโปรเจกต์ (ส่วนสำคัญ)

- `app/_layout.js` — Root layout, Theme + Auth providers, Stack screens
- `app/login.jsx`, `app/register.jsx` — หน้าจอยืนยันตัวตน
- `app/books/index.jsx` — รายการหนังสือ (ค้นหา, แบ่งหน้า, +ใหม่)
- `app/books/[id].jsx` — รายละเอียดหนังสือ (แก้ไข/ลบ)
- `app/books/[id]/edit.jsx` — ฟอร์มแก้ไข
- `app/books/create.jsx` — ฟอร์มสร้างใหม่
- `context/AuthContext.js` — สถานะ auth, เก็บ token, โหลดโปรไฟล์, จัดการ 401
- `context/AppTheme.js` — Theme tokens และ provider
- `lib/api.js` — API base URL + fetch helper
- `lib/events.js` — Event bus เล็กๆ สำหรับรีเฟรชรายการหนังสือ

## ข้อกำหนดเบื้องต้น

- Node.js LTS
- Backend (Classroom API) ที่รันอยู่และเข้าถึงได้จากอุปกรณ์/emulator
  - ต้องมี endpoints ตามเอกสารภายใต้ `/api/auth/*` และ `/api/books/*`
  - Swagger UI มักอยู่ที่ `/api-docs`

## การตั้งค่า

แอปอ่าน backend base URL จากตัวแปรสภาพแวดล้อม `EXPO_PUBLIC_API_BASE_URL` ใน `lib/api.js`:

- `export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000";`

เมื่อทดสอบบนอุปกรณ์จริง/emulator หลีกเลี่ยง `localhost` ให้ใช้ IP ของเครื่องคุณ (เช่น `http://192.168.1.10:3000`)

- Windows PowerShell (ชั่วคราวสำหรับ session นี้):

```powershell
# แทนที่ด้วย IP เครื่องที่รัน API
$env:EXPO_PUBLIC_API_BASE_URL="http://YOUR_PC_IP:3000"; npm run start
```

เคล็ดลับ Android emulator: ใช้ `http://10.0.2.2:3000` เพื่อเข้าถึง host machine

ตรวจสอบให้แน่ใจว่า backend อนุญาต CORS สำหรับ origin ของ Expo dev server

## ติดตั้งและรัน

1) ติดตั้ง dependencies

```powershell
npm install
```

2) เริ่มต้นแอป

```powershell
npm run start
```

3) เลือกแพลตฟอร์ม (Android/iOS/Web) จาก Expo CLI

## Using the app

- First launch: you’ll be redirected to Login if not authenticated.
- Register: requires username, email, password (only fields the API expects)
- Login: email, password
- Books:
  - List: search, pagination, tap a card for details
  - Create: tap "+ New" in the list
  - Edit/Delete: from the detail page
  - After create/update/delete, the list auto-refreshes
- Token expiry: if the server returns 401, you’ll be prompted and redirected to Login.

## หมายเหตุการใช้งาน

- Guards ใช้ `<Redirect href="/login" />` แทนการนำทางแบบ imperative เพื่อหลีกเลี่ยงการซ้อนหน้าจอภายใต้ Strict Mode
- Auto-refresh ผสมผสาน event bus เล็กๆ (`lib/events.js`) และการโหลดใหม่เมื่อ focus หน้าจอ
- Token ถูกเก็บผ่าน `expo-secure-store`; โปรไฟล์โหลดเมื่อเริ่มแอปหาก token มีอยู่

## แก้ไขปัญหา

- 401 Unauthorized
  - ตรวจสอบ `EXPO_PUBLIC_API_BASE_URL`
  - ยืนยันว่า API เข้าถึงได้จากอุปกรณ์/emulator และ CORS ถูกตั้งค่า
- เครือข่าย
  - ตรวจสอบให้แน่ใจว่าอุปกรณ์และ API server อยู่ในเครือข่ายเดียวกัน
  - ใช้ IP แทน `localhost` บนอุปกรณ์จริง
- ปัญหา Build
  - รัน `npm install` หลังดึงการเปลี่ยนแปลง
  - หากเกิดความขัดแย้งของ dependency/version ให้ปรับเวอร์ชัน React/React Native ตามข้อแนะนำของ Expo SDK 53

## Scripts

- `npm run start` — เริ่ม Expo dev server
- `npm run android` — เริ่มบน Android
- `npm run ios` — เริ่มบน iOS
- `npm run web` — เริ่มบน web

## License

โปรเจกต์นี้ไม่ได้รวมไฟล์ license โดยค่าเริ่มต้น เพิ่มได้หากต้องการแชร์/กระจาย
