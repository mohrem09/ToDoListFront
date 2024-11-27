import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = []; // Liste des tâches
  newTask = {
    // Objet pour la nouvelle tâche
    title: '',
    description: '',
    priority: 'Low',
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); // Charger les tâches au démarrage
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
  onSubmit(): void {
    this.taskService.createTask(this.newTask).subscribe(
      (data) => {
        console.log('Tâche créée:', data);
        this.loadTasks(); // Recharger les tâches après l'ajout
        this.newTask = { title: '', description: '', priority: 'Low' }; // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de la création de la tâche', error);
      }
    );
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
