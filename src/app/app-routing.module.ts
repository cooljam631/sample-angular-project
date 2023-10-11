import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent} from './person-list/person-list.component';
import { PersonCreateComponent} from './person-create/person-create.component';
import { PersonEditComponent} from './person-edit/person-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'persons', component: PersonListComponent},
  { path: 'persons/create', component: PersonCreateComponent},
  { path: 'persons/:id/edit', component: PersonEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
