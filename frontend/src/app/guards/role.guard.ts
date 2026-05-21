import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: ('admin' | 'agent' | 'client')[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.getUtilisateurCourant();

    if (user && allowedRoles.includes(user.role)) {
      return true;
    }

    // Accès refusé : rediriger vers l'accueil
    return router.parseUrl('/');
  };
};
