import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('crud_app');

  items: any[] = [];
  employeeModal = false;
  isUpdate = false;
  id = '';

  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required), // ห้ามว่าง
    surname: new FormControl('', Validators.required) // ห้ามว่าง และต้องมากกว่า 0
  });
  private dataService = inject(AppService);

  ngOnInit() {
    this.loadData();
  }

  // (Read) โหลดข้อมูลมาแสดง
  loadData() {
    this.dataService.getItems().subscribe(data => {
      this.items = data;
      console.log('data', data)
    });
  }

  // (Create) รับค่าจาก HTML มาบันทึก
  addNew() {
    // 1. เช็คฟอร์มก่อน
    if (this.employeeForm.invalid) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const newItem = this.employeeForm.value;

    // 2. ตัดสินใจว่าจะใช้ API ตัวไหน (Update หรือ Create) แล้วเก็บไว้ในตัวแปร request$
    const request$ = this.isUpdate
      ? this.dataService.updateItem(this.id, newItem)
      : this.dataService.createItem(newItem);

    // 3. สั่งทำงาน (Subscribe) แค่ที่เดียวจบ!
    request$.subscribe({
      next: () => {
        this.loadData();              // อัปเดตตาราง
        this.employeeForm.reset();    // ล้างข้อมูลในฟอร์ม
        this.employeeModal = false;   // ปิด Modal

        // รีเซ็ตสถานะกลับเป็นโหมด "เพิ่มข้อมูล" เผื่อการกดครั้งต่อไป
        this.isUpdate = false;
        this.id = '';

        alert('บันทึกข้อมูลสำเร็จ!');
      },
      error: (error) => {
        console.error(error);
        alert('เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้');
      }
    });
  }

  // (Delete) ลบข้อมูลตาม ID
  delete(id: string) {
    if (confirm('ต้องการลบสินค้านี้ใช่หรือไม่?')) {
      this.dataService.deleteItem(id).subscribe(() => {
        this.loadData(); // โหลดตารางใหม่หลังลบเสร็จ
      });
    }
  }

  openModal(item: any, mode: string) {
    if (mode === 'edit' && item) {
      this.employeeForm.patchValue({
        name: item.name,
        surname: item.surname
      });
      this.id = item.id;
      this.isUpdate = true;
    } else {
      this.employeeForm.reset();
      this.isUpdate = false;
    }
    this.employeeModal = true;
    console.log('openModal', item, mode, this.isUpdate);
  }
}
