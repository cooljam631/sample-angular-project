import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  personId: number;
  personForm: FormGroup;
  roles: Role[] = [];
  selectedRoleId: number;
  availableRoles: Role[] = [];

  constructor(private personService: PersonService, private roleService:RoleService, 
    private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, 
    private datePipe: DatePipe){}

  ngOnInit(): void {
   this.personForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    middleName: [''],
    suffix: [''],
    title: [''],
    streetNo: [''],
    barangay: [''],
    city: [''],
    zipCode: [''],
    birthday: [''],
    gwa: [''],
    dateHired: [''],
    landline: [''],
    mobileNumber: [''],
    email: ['', Validators.email],
    selectedRoleId: [[]],
   });
   this.route.params.subscribe((params) =>{
    this.personId = +params['id'];
   })
   

   this.loadPersonData();
   this.roleService.getRoles().subscribe((roles) => {
    this.availableRoles = roles;
  },
  (error)=>{
    console.error('Error fetching roles:', error);
  }
  );
  }

  public updatePersonInfo(personId: number): void{
    const updatedPersonData = this.personForm.value;
    this.personService.updatePerson(personId, updatedPersonData).subscribe((updatedPerson) => {
      console.log('Person Updated Successfully:', updatedPerson);
      this.router.navigate(['/persons']);
    },
    (error) => {
      console.error('Error updating person:', error);
    }
    );
  }

  private loadPersonData(){
    this.personService.getPersonById(this.personId).subscribe((person) => {
      this.personForm.patchValue({
        firstName: person.firstName,
        lastName: person.lastName,
        middleName: person.middleName,
        suffix: person.suffix,
        title: person.title,
        streetNo: person.streetNo,
        barangay: person.barangay,
        city: person.city,
        zipCode: person.zipCode,
        birthday: person.birthday,
        gwa: person.gwa,
        dateHired: person.dateHired,
        landline: person.landline,
        mobileNumber: person.mobileNumber,
        email: person.email
      });
      this.roles = [...person.roles];
    },
    (error) =>{
      console.error('Error loading person data:', error);
    }
    );
  }

  public addRoleToPerson(roleId: number){
    const formData = this.personForm.value;
    roleId = formData.selectedRoleId;
    this.personService.addRoleToPerson(this.personId, roleId).subscribe((response) =>{
      console.log('Role added sucessfully', response);
    },
    (error) => {
      console.log('roleId:', roleId);
      console.error('Error adding role:', error);
    }
    );
  }

  public removeRoleFromPerson(roleId: number){
    this.personService.removeRoleFromPerson(this.personId, roleId).subscribe((response) =>{
      console.log('Role removed successfully', response);
    },
    (error) => {
      console.error('Error removing role:', error);
    }
    );
  }

  public onSubmit(){
    if(this.personForm.valid){
      const formData = this.personForm.value;
      formData.birthday = this.datePipe.transform(formData.birthday, 'yyyy-MM-dd');
      formData.dateHired = this.datePipe.transform(formData.dateHired, 'yyyy-MM-dd');
      this.personService.updatePerson(this.personId, formData).subscribe((data) =>{
        console.log('Person updated successfully:', data);
        this.router.navigate(['/persons']);
      },
      (error) =>{
        console.error('Error updating person: ', error);
      })
    }
  }

}
