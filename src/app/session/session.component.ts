import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service'; // Service pour gérer les sessions

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent implements OnInit {
  sessions: any[] = []; // Liste des sessions
  accessKey: string = ''; // Clé d'accès entrée par l'utilisateur

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  // Charger les sessions depuis le service
  loadSessions(): void {
    this.sessionService.getSessions().subscribe((data) => {
      this.sessions = data;
    });
  }

  // Créer une nouvelle session
  createSession(): void {
    const sessionName = prompt('Entrez un nom pour la session :');
    if (sessionName) {
      this.sessionService.createSession(sessionName).subscribe(
        (data) => {
          console.log('Session créée:', data);
          this.loadSessions(); // Recharger les sessions
        },
        (error) => {
          console.error('Erreur lors de la création de la session', error);
        }
      );
    }
  }

  // Rejoindre une session avec une clé
  joinWithKey(): void {
    this.sessionService.joinSessionByKey(this.accessKey).subscribe(
      (data) => {
        console.log('Rejoint la session:', data);
        this.loadSessions();
      },
      (error) => {
        console.error('Erreur lors de la tentative de rejoindre', error);
      }
    );
  }

  // Rejoindre une session par ID
  joinSession(sessionId: number): void {
    console.log(`Rejoint la session ID: ${sessionId}`);
    // Redirige ou charge la session correspondante ici
  }
}
