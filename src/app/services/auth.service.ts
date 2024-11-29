import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    // Vérifie si un token existe dans le stockage local
    return !!localStorage.getItem('token');
  }

  // Méthode pour se connecter (juste un exemple)
  login(token: string): void {
    localStorage.setItem('token', token);
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('token');
  }
}
