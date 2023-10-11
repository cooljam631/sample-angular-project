import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { Role } from '../role';
import { PersonService } from '../person.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {
  roles: Role[] = [];
  personForm: FormGroup;
  selectedRoleIds: number[] = [];

  constructor(private formBuilder: FormBuilder, private personService: PersonService, private roleService: RoleService, private datePipe: DatePipe, private router: Router){}

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      suffix: [''],
      title: [''],
      streetNo: ['', Validators.required],
      barangay: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      birthday: ['', Validators.required],
      gwa: ['', Validators.required],
      dateHired: ['', Validators.required],
      currentlyEmployed: [true],
      landline: [''],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roleIds: [[]],
      deleted: [false]
    });

    this.roleService.getRoles().subscribe((roles) => {
      this.roles = roles;
    },
    (error)=>{
      console.error('Error fetching roles:', error);
    }
    );
  }

  public onSubmit(): void {
    if(this.personForm.valid){
      console.log('Creating person');
      const formData = this.personForm.value;
      formData.birthday = this.datePipe.transform(formData.birthday, 'yyyy-MM-dd');
      formData.dateHired = this.datePipe.transform(formData.dateHired, 'yyyy-MM-dd');
      formData.roleIds = Array.isArray(formData.roleIds) ? formData.roleIds : [formData.roleIds];
      console.log(formData.birthday);
      this.personService.createPerson(formData).subscribe(
        (data) => {
          console.log(data);
        alert('Person created successfully!');
        this.router.navigate(['/persons']);
      }, (error) => {
        console.error('Error creating person:', error);
      }
      );
    }
  }
}
