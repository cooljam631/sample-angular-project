import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';

enum SortingCriteria{
  GWA = 'GWA',
  DateHired = 'DateHired',
  LastName = 'LastName',
}

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit{
  public persons: Person[];
  public selectedSortingCriteria: SortingCriteria;
  public SortingCriteria = SortingCriteria;
  
  constructor(private personService: PersonService, private router: Router){
    this.selectedSortingCriteria = SortingCriteria.GWA;
  }

  ngOnInit(): void {
    this.getPersonsBySortingCriteria();
  }

  public getPersonsBySortingCriteria(){
    if(this.selectedSortingCriteria === SortingCriteria.GWA){
      this.personService.getPersonsByGWA().subscribe((response: Person[]) => {
        this.persons = response;
        console.log(this.persons);
      });
    } else if (this.selectedSortingCriteria === SortingCriteria.DateHired){
      this.personService.getPersonsByDateHired().subscribe((response: Person[]) => {
        this.persons = response;
      });
    } else if(this.selectedSortingCriteria === SortingCriteria.LastName){
      this.personService.getPersonsByLastName().subscribe((response: Person[]) => {
        this.persons = response;
      });
    }
  }

  public goToCreatePerson(): void {
    console.log('Navigating to PersonCreateComponent');
    this.router.navigate(['/persons/create']);
  }

  public onDeletePerson(personId: number): void{
    if(confirm('Are you sure you want to delete this person?')){
      this.personService.deletePerson(personId).subscribe((response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error deleting person: ', error);
      }
      );
    }
  }

  public editPerson(personId: number): void{
    this.router.navigate(['/persons', personId, 'edit']);
  }

}
