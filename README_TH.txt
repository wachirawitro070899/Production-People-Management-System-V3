Production People Management System V307

ปรับระบบคะแนน Skill Matrix และ Skill Card:
- คะแนนแต่ละหัวข้ออยู่ระหว่าง 1-5 และค่าต่ำสุดเป็น 1
- คะแนนรวม = ผลบวกคะแนนทุกหัวข้อ โดยไม่คูณ 2
- คะแนนต่ำสุดและสูงสุดคำนวณตามจำนวนหัวข้อของแต่ละ Section
- เกณฑ์ Acceptance ปรับอัตโนมัติตามจำนวนหัวข้อ
- Skill Card แสดงคะแนนเต็มตามจำนวนหัวข้อจริง

V308: เพิ่มคำอธิบาย Skill Level 1-5 ใน Section Skill Matrix, Employee Skill Card และงานพิมพ์/PDF

V309: รวมเกณฑ์คะแนนและคำอธิบาย Skill Level 1-5 ไว้ใน Acceptance Criteria แบบคำนวณตามจำนวนหัวข้ออัตโนมัติ


V312: ย้ายปุ่มตั้งค่าพิมพ์/บันทึก PDF และดาวน์โหลดข้อมูลไปไว้ด้านบนของทุกหน้ารายงาน โดยเรียงปุ่มพิมพ์ก่อนปุ่มดาวน์โหลด และรองรับหน้าจอมือถือ


การแก้ไขกลุ่ม Sorting 1 / Sorting 2:
1) Login Admin
2) ไปที่ Search Employee
3) กด แก้ไขข้อมูล / รูป ที่พนักงาน
4) เลือก กลุ่ม Sorting เป็น Sorting 1 หรือ Sorting 2
5) กด บันทึกข้อมูล แล้วตรวจสอบที่ Section Organization Chart

อัปเดต V310: ทำให้ข้อมูลและรูปแสดงในทุกเครื่อง
1) เปิดเว็บจากเครื่องหลักที่มีข้อมูลและรูปครบ
2) ไปที่ Export Center
3) กด "ดาวน์โหลด employees-data.js สำหรับเผยแพร่"
4) นำไฟล์ที่ได้ไปแทนที่ employees-data.js ใน GitHub Repository
5) Commit changes และรอ GitHub Pages อัปเดต
6) เครื่องอื่นเปิดเว็บใหม่แล้วกด Ctrl+F5

หมายเหตุ: GitHub Pages ไม่สามารถเขียนข้อมูลกลับไปที่ Repository อัตโนมัติได้ จึงต้องเผยแพร่ employees-data.js หลังแก้ไขข้อมูลหรือรูปครั้งใหญ่

V318 - Skill Matrix Baseline / Quarterly Update
- Login Admin แล้วเข้า Section Skill Matrix
- กด "อัปเดต Skill ปัจจุบัน" หรือคลิกเลข Level ในตาราง
- เลือก Baseline เพื่อบันทึกระดับปัจจุบันก่อนเริ่มรอบใหม่
- ไตรมาสถัดไปเลือก Quarterly Skill Adjustment หลัง Examination + OJT + Job Observation
- ระบบคำนวณ Score/Acceptance และบันทึกวันที่ ผู้ประเมิน เหตุผล และประวัติเดิม/ใหม่
