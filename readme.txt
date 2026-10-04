frontend 
 npm install -g @angular/cli ลง angular ถ้าไม่มี
 ng new crud-app ถ้ามีก็สร้างโปรเจค
 cd crud-app

 # สร้างหน้าจอสำหรับแสดงข้อมูล (Component)
ng g c product

# สร้างไฟล์สำหรับต่อ API (Service)
ng g s services/data
ื
ng s รันโปรเจค

backend
mkdir backend-node สร้างโฟลเดอร์
cd backend-node
npm init -y ติดตั้ง package
npm install express cors knex mysql2 ติดตั้งการใช้งาน sql2

node server.js รัน