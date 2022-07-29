import { Component } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  modalTitle:string;
  //pagination
  rows = 5;
  recourdNumber: number;

  /**
   *
   */
  constructor() {
    this.recourdNumber = this.employees.length;


  }

  employees = [
    { name: 'Peter', age: 23, department: 'IT', salary: 5400 },
    { name: 'Nagy', age: 56, department: 'Development', salary: 5000 },
    { name: 'Swelam', age: 26, department: 'Design', salary: 2000 },
    { name: 'Gemy', age: 25, department: 'Design', salary: 2500 },
    { name: 'Mona', age: 24, department: 'IT', salary: 3700 },
    { name: 'Salma', age: 23, department: 'IT', salary: 5600 },
    { name: 'Kondy', age: 29, department: 'Design', salary: 6500 },
    { name: 'Mahmoud', age: 65, department: 'IT', salary: 5000 },

    { name: 'Moustfa++', age: 55, department: 'IT', salary: 5000 },
    { name: 'nagy++', age: 65, department: 'IT', salary: 5000 },
    { name: 'Swelam++', age: 26, department: 'Design', salary: 2000 },
    { name: 'Gemy++', age: 25, department: 'IT', salary: 2500 },
    { name: 'Mona++', age: 24, department: 'Design', salary: 3700 },
    { name: 'Salma++', age: 23, department: 'IT', salary: 5600 },
    { name: 'Kondy++', age: 29, department: 'Design', salary: 6500 },
    { name: 'Mahmoud++', age: 65, department: 'IT', salary: 5000 },
    { name: 'Moustfa++', age: 55, department: 'Design', salary: 5000 },
    { name: 'nagy++', age: 65, department: 'IT', salary: 5000 },

    { name: 'Peter', age: 23, department: 'IT', salary: 5400 },
    { name: 'Nagy', age: 56, department: 'Development', salary: 5000 },
    { name: 'Swelam', age: 26, department: 'Design', salary: 2000 },
    { name: 'Gemy', age: 25, department: 'Design', salary: 2500 },
    { name: 'Mona', age: 24, department: 'IT', salary: 3700 },
    { name: 'Salma', age: 23, department: 'Design', salary: 5600 },
    { name: 'Kondy', age: 29, department: 'IT', salary: 6500 },
    { name: 'Mahmoud', age: 65, department: 'IT', salary: 5000 },

    { name: 'Moustfa++', age: 55, department: 'Development', salary: 5000 },
    { name: 'nagy++', age: 65, department: 'IT', salary: 5000 },
    { name: 'Swelam++', age: 26, department: 'Design', salary: 2000 },
    { name: 'Gemy++', age: 25, department: 'IT', salary: 2500 },
    { name: 'Mona++', age: 24, department: 'Design', salary: 3700 },
    { name: 'Salma++', age: 23, department: 'IT', salary: 5600 },
    { name: 'Kondy++', age: 29, department: 'Design', salary: 6500 },
    { name: 'Mahmoud++', age: 65, department: 'Design', salary: 5000 },
    { name: 'Moustfa++', age: 55, department: 'Development', salary: 5000 },
    { name: 'nagy++', age: 65, department: 'Development', salary: 5000 },

  ];

  clear(table: Table) {
    table.clear();
  }

  addNewClick(){
    this.modalTitle = "إضافة موظف جديد";
  }
}
