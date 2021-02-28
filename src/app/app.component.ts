import {Component, OnInit} from '@angular/core';
import {Employee} from './employee';
import {EmployeeService} from './employee.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees!: Employee[];
  public mEmployee?: Employee;

  ngOnInit(): void {
    this.getEmployees();
  }
  constructor(private employeeService: EmployeeService) {
  }
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee|null, mode: string): void {
    const container = document.getElementById('main-container');
    const modal = document.createElement('div');
    // button.type = 'p';
    modal.style.display = 'none';
    modal.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      modal.setAttribute('data-target', '#addEmployeeModal');
    }
    else if (mode === 'edit')  {
      if (employee) {
        this.mEmployee = employee;
      }
      modal.setAttribute('data-target', '#editEmployeeModal');
    }
    else {
      // @ts-ignore
      this.mEmployee = employee;
      modal.setAttribute('data-target', '#deleteEmployeeModal');
    }
    // @ts-ignore
    container.appendChild(modal);

    modal.click();
  }

  onAddEmployee(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-employee-cancel').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onUpdateEmployee(employee: Employee): void {
    // @ts-ignore
    document.getElementById('edit-cancel').click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  onDeleteEmployee(id: number|undefined): void {
    // @ts-ignore
    document.getElementById('delete-cancel').click();
    if (id !== undefined) {
      this.employeeService.deleteEmployee(id).subscribe(
      (response: any) => {
          console.log(response);
          this.getEmployees();
        },
      (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
  searchEmployeeByKey(key: string): void {
    console.log('onSearching: key=' + key);
    const results: Employee[] = [];

    for (const employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
