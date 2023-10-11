import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from './person';
import { PersonService } from './person.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public persons: Person[];

  constructor(private router: Router){}

  ngOnInit() {
    this.router.navigate(['/login']);
  }

}
