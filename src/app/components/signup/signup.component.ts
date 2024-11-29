import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // N'oubliez pas d'importer Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]], // Optionnel, à vérifier côté frontend
    });
  }

  onSignup() {
    if (this.signupForm.invalid) {
      console.log('Formulaire invalide');
      return;
    }

    const signupData = this.signupForm.value;
    this.http.post('http://localhost:3000/signup', signupData).subscribe({
      next: (response) => {
        console.log('Compte créé avec succès', response);
        // Redirection vers la page de login après une inscription réussie
        this.router.navigate(['/login']);
      },
      error: (err) =>
        console.error('Erreur lors de la création de compte', err),
    });
  }
}
