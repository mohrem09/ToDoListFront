import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [
  { path: 'TaskListComponent', component: TaskListComponent }, // Pas de slash ici
  { path: '', redirectTo: 'TaskListComponent', pathMatch: 'full' }, // Redirection par défaut vers TaskListComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
