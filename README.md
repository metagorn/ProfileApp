# ProfileApp (มึงไม่เอาแล้วใครจะเอา)

แอปสำหรับพวกเด็กใหม่ที่ยังไม่รู้จัก React Nat## วิธีใช้แอป (ใช้ไม่เป็นก็ไปเรียนใหม่)

- เปิดครั้งแรก: ถ้ายังไม่ล็อกอิน จะพาไปหน้า Login เลย (อย่าตกใจ)
- สมัครสมาชิก: ต้องใส่ username, email, password (เท่าที่ API ต้องการ อย่าใส่เกิน)
- ล็อกอิน: email, password (ง่ายขนาดนี้ใช้ไม่เป็นก็ไม่รู้จะว่าไง)
- หนังสือ:
  - รายการ: ค้นหา, แบ่งหน้า, แตะการ์ดเพื่อดูรายละเอียด
  - สร้างใหม่: กด "+ New" ในรายการ (ปุ่มใหญ่ขนาดนั้น มองไม่เห็นหรอ)
  - แก้ไข/ลบ: จากหน้ารายละเอียด
  - หลังสร้าง/อัปเดต/ลบ รายการจะรีเฟรชเอง (ไม่ต้องรีโหลดแอป)
- Token หมดอายุ: ถ้าเซิร์ฟเวอร์ส่ง 401 จะเตือนและพากลับไปหน้า Login (อย่ามาบ่นว่าทำไม) ใช้ Expo Router เพราะเขียน route เองไม่เป็น กูสร้างให้มึงแล้วอย่ามาบ่น

## ฟีเจอร์ที่กูทำให้ (จะเอาก็เอาไป)

- ธีม (สลับสีได้ อย่ามาบอกว่าไม่สวย)
  - โหมดสว่าง/มืด ใน `context/AppTheme.js` (อ่านโค้ดเอาเอง)
  - ปุ่มสลับบน header ทุกหน้า (ไม่งั้นมึงไปกดที่ไหน)
- ระบบล็อกอิน (สำหรับคนที่ลืมรหัสง่าย ๆ)
  - สมัครสมาชิก (username, email, password) และล็อกอิน (email, password)
  - เก็บ token ด้วย `expo-secure-store` (ปลอดภัยกว่าใจมึง)
  - โหลดโปรไฟล์จาก `/api/auth/profile` (API ต้องทำงานด้วยนะ ไม่งั้นอย่าโทษกู)
  - หมดอายุแล้วโดนเตะออกอัตโนมัติ (401 เข้าใจมั้ย)
- จัดการหนังสือ (CRUD แบบเต็มรูปแบบ อย่ามาบอกว่าขาด)
  - รายการพร้อมค้นหาและแบ่งหน้า (เก่งกว่ามึงแน่)
  - หน้ารายละเอียดพร้อมปุ่มแก้ไข/ลบ (ง่ายจนเด็กก็ทำได้)
  - ฟอร์มสร้าง/แก้ไข ใช้แค่ฟิลด์ที่ API อนุญาต (อย่ามาส่งข้อมูลเพิ่ม)
  - รีเฟรชอัตโนมัติหลังแก้ไข (event bus + focus reload ไม่รู้ก็ไปอ่าน)
- การนำทาง
  - `expo-router` stack กับการป้องกันหน้าด้วย `<Redirect />` (ไม่ล็อกอินอย่าฝันจะเข้า)

## เทคโนโลยีที่ใช้ (มึงไม่รู้ก็ไปหาอ่าน)

- Expo SDK 53, Expo Router ~5 (อัปเดตให้ทัน ไม่งั้นเสียเวลา)
- React Native 0.79, React 19 (เวอร์ชันใหม่สุด อย่ามาใช้ของเก่า)
- `expo-secure-store` สำหรับเก็บ token (ปลอดภัยกว่าการเก็บใน localStorage)

หมายเหตุ: React 19 กับ Expo 53 อาจไม่ compatible 100% ถ้าเจอปัญหาก็ลดเวอร์ชัน React ลงมา อย่ามาโทษกู

## โครงสร้างโปรเจกต์ (ส่วนสำคัญที่มึงต้องรู้)

- `app/_layout.js` — Layout หลัก, Theme + Auth providers, Stack screens
- `app/login.jsx`, `app/register.jsx` — หน้าล็อกอิน (ใช้ไม่เป็นก็ไปเรียน)
- `app/books/index.jsx` — รายการหนังสือ (ค้นหา, แบ่งหน้า, +ใหม่)
- `app/books/[id].jsx` — รายละเอียดหนังสือ (แก้ไข/ลบ)
- `app/books/[id]/edit.jsx` — ฟอร์มแก้ไข
- `app/books/create.jsx` — ฟอร์มสร้างใหม่
- `context/AuthContext.js` — สถานะ Auth, เก็บ token, ดึงโปรไฟล์, จัดการ 401
- `context/AppTheme.js` — ธีมและสี
- `lib/api.js` — API base URL + fetch helper
- `lib/events.js` — Event bus สำหรับรีเฟรชรายการหนังสือ

## สิ่งที่ต้องมีก่อน (ไม่มีอย่าฝันจะรัน)

- Node.js LTS (ติดตั้งให้เรียบร้อย อย่ามาใช้เวอร์ชันเก่า)
- Backend (Classroom API) ที่รันอยู่และเข้าถึงได้จากอุปกรณ์มึง
  - ต้องมี endpoints `/api/auth/*` และ `/api/books/*`
  - Swagger UI มักอยู่ที่ `/api-docs` (ไปดูเอา)

## การตั้งค่า (อย่าข้ามขั้นตอนนี้ ไม่งั้นงานเสีย)

แอปอ่าน backend base URL จากตัวแปร `EXPO_PUBLIC_API_BASE_URL` ใน `lib/api.js`:

- `export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000";`

ตอนทดสอบบนมือถือ/emulator จริง อย่าใช้ `localhost` มันไม่ทำงาน ใช้ IP ของเครื่องมึงแทน (เช่น `http://192.168.1.10:3000`)

- Windows PowerShell (ชั่วคราวสำหรับ session นี้):

```powershell
# แทน YOUR_PC_IP ด้วย IP จริงของเครื่องที่รัน API (ไม่รู้ก็ไป ipconfig)
$env:EXPO_PUBLIC_API_BASE_URL="http://YOUR_PC_IP:3000"; npm run start
```

เคล็ดลับ Android emulator: ใช้ `http://10.0.2.2:3000` สำหรับเชื่อมต่อไปยังเครื่อง host

ตรวจสอบให้แน่ใจว่า backend เปิด CORS ให้ Expo dev server ด้วย (ไม่งั้นโดน block)

## ติดตั้งและรัน (ทำตามลำดับ อย่าข้าม)

1) ติดตั้ง dependencies

```powershell
npm install
```

2) รันแอป

```powershell
npm run start
```

3) เลือกแพลตฟอร์ม (Android/iOS/Web) จาก Expo CLI (ไม่รู้จะเลือกอะไรก็เลือก Web ไปก่อน)

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

## หมายเหตุการทำงาน (อ่านไว้ ไม่งั้นงง)

- การป้องกันหน้าใช้ `<Redirect href="/login" />` แทนการนำทางแบบ imperative เพื่อไม่ให้หน้าซ้อนกัน
- รีเฟรชอัตโนมัติใช้ event bus (`lib/events.js`) กับการโหลดใหม่เมื่อโฟกัส
- Token เก็บด้วย `expo-secure-store` และโหลดโปรไฟล์ตอนเปิดแอป

## แก้ปัญหา (ไม่อยากให้มาถาม)

- 401 Unauthorized
  - เช็ค `EXPO_PUBLIC_API_BASE_URL` ให้ถูก
  - ตรวจสอบว่า API เข้าถึงได้จากอุปกรณ์และตั้ง CORS แล้ว
- Network
  - ให้อุปกรณ์และเซิร์ฟเวอร์ API อยู่เน็ตเวิร์กเดียวกัน
  - ใช้ IP แทน `localhost` บนอุปกรณ์จริง (บอกแล้วนี่)
- Build issues
  - รัน `npm install` หลัง pull โค้ดใหม่
  - ถ้าเจอ dependency/version conflicts ให้ปรับ React/React Native ตาม Expo SDK 53 (ไปอ่านเอกสาร)

## คำสั่งที่ใช้ (ไม่รู้ก็อย่าแตะ)

- `npm run start` — เริ่ม Expo dev server
- `npm run android` — รันบน Android
- `npm run ios` — รันบน iOS  
- `npm run web` — รันบน web (ง่ายสุด)

## License (ไม่สนใจก็ข้าม)

โปรเจกต์นี้ไม่มีไฟล์ license มาให้ ถ้าจะแชร์/แจกจ่าย ก็เพิ่มเอาเอง
