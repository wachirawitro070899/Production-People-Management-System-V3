Production People Management System V302 - Stable Full Template

- เก็บข้อมูลพนักงานเดิมทั้งหมด
- ใช้ Template Organization, Skill Matrix และ Skill Card แบบเอกสารองค์กร
- ทุก Dropdown มีช่องค้นหาเมื่อรายการมีจำนวนมาก
- ปรับกระดาษ A4/A3, แนวตั้ง/แนวนอน และขนาด 70-120% ก่อนพิมพ์
- ดาวน์โหลด CSV แยกตามหน้า, Backup JSON และนำเข้าข้อมูลกลับได้
- ไม่ใช้ Firebase/CDN/Patch จึงลดปัญหาหน้าว่างและปุ่มไม่ทำงาน
- ข้อมูลเก็บใน Local Storage ของ Browser ควร Backup JSON เป็นประจำ

Admin password เริ่มต้น: 1234

V303 Stable Employee Photo Editor
- แก้ไขข้อมูลพนักงานได้โดยตรงจากหน้า Search Employee
- รองรับเพิ่ม/เปลี่ยน/ลบรูปพนักงาน พร้อมย่อรูปอัตโนมัติ
- รองรับเปลี่ยนรหัสพนักงานโดยไม่สร้างข้อมูลซ้ำ
- เก็บข้อมูลเดิมและรูปใน Local Storage
- ลบ patch, fallback และ Firebase files ที่ไม่ได้ใช้งาน
- ดาวน์โหลด CSV / Backup JSON และพิมพ์ A4/A3 ได้
