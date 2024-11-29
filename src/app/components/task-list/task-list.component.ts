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
    title: '',
    description: '',
    priority: '',
    statut: 'To Do',
  };
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  doneTasks: any[] = [];
  selectedTask: any = null; // La tâche sélectionnée pour l'édition
  editMode: boolean = false; // Contrôle l'affichage du formulaire d'édition
  showForm = false; // Contrôle l'affichage du formulaire

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); // Charger les tâches au démarrage
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
  filterTasks(): void {
    this.todoTasks = this.tasks.filter((task) => task.status === 'To do');
    this.inProgressTasks = this.tasks.filter(
      (task) => task.status === 'In progress'
    );
    this.doneTasks = this.tasks.filter((task) => task.status === 'Done');
  }

  toggleForm(): void {
    this.showForm = !this.showForm; // Alterner entre afficher et cacher le formulaire
  }

  logout(): void {
    localStorage.removeItem('token'); // Supprime le token JWT
    console.log('Déconnexion réussie');
    window.location.href = '/login'; // Redirige vers la page de connexion
  }

  onSubmit(): void {
    this.taskService.createTask(this.newTask).subscribe(
      (data) => {
        console.log('Tâche créée:', data);
        this.loadTasks(); // Recharger les tâches après l'ajout
        this.newTask = {
          title: '',
          description: '',
          priority: 'Low',
          statut: '',
        }; // Réinitialiser le formulaire
        this.toggleForm(); // Fermer le formulaire après soumission
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
  editTask(task: any): void {
    this.selectedTask = { ...task }; // Créer une copie pour éviter les modifications directes
    this.editMode = true;
  }

  cancelEdit(): void {
    this.selectedTask = null;
    this.editMode = false;
  }

  updateTask(): void {
    this.taskService
      .updateTask(this.selectedTask.id, this.selectedTask)
      .subscribe(
        () => {
          console.log('Tâche mise à jour');
          this.loadTasks(); // Recharger les tâches après modification
          this.cancelEdit(); // Fermer le formulaire
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la tâche', error);
        }
      );
  }
}
