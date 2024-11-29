import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Récupérer le token
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token, // Ajouter le token dans l'en-tête
        },
      });
    }
    return next.handle(request);
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // Injection du routeur
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      console.log('Formulaire invalide');
      return;
    }

    const loginData = this.loginForm.value;
    this.http.post('http://localhost:3000/login', loginData).subscribe({
      next: (response: any) => {
        console.log('Connexion réussie', response);

        // Stocke le token si nécessaire
        if (response.token) {
          localStorage.setItem('token', response.token); // Exemple d'enregistrement du token
        }

        // Redirection vers "task-list"
        this.router.navigate(['/task-list']);
      },
      error: (err) => console.error('Erreur de connexion', err),
    });
  }
}
