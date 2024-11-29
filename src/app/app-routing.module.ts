import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard'; // Pour protéger les routes

import { TaskListComponent } from './components/task-list/task-list.component';
import { SignUpComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'task-list', component: TaskListComponent, canActivate: [authGuard] }, // Protège la route
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirection pour les URL invalides
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
