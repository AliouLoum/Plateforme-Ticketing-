import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utilisateur } from '../models';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private nbAuthService = inject(NbAuthService);

  private currentUserSubject = new BehaviorSubject<Utilisateur | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.nbAuthService.onTokenChange().subscribe((token) => {
      if (token.isValid()) {
        const payload = token.getPayload(); // Objet décodé à partir du JWT
        
        this.currentUserSubject.next({
          id: payload.id || 'test',
          nomComplet: payload.nomComplet || 'Utilisateur',
          email: payload.email || 'test@test.com',
          avatar: '',
          role: payload.role as any || 'client',
          departement: 'IT',
          billetsAssignes: 0,
          creeLe: new Date().toISOString(),
          estEnLigne: true
        });
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  // Permet au header d'appeler deconnexion
  deconnexion(): void {
    // Avec Nebular, on redirige généralement vers /auth/logout
    this.router.navigate(['/auth/logout']);
  }

  estConnecte(): boolean {
    return !!this.currentUserSubject.value;
  }

  getUtilisateurCourant(): Utilisateur | null {
    return this.currentUserSubject.value;
  }

  aRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === role : false;
  }
}

