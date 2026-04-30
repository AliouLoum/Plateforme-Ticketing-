import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Barre de navigation principale (En-tête) -->
    <header class="header">
      <div class="logo">
        <span class="sene">Sene</span><span class="ticket">Ticket</span>
      </div>
      
      <!-- Liens de navigation -->
      <nav class="nav-links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Explorer</a>
        <a routerLink="/lieux" routerLinkActive="active">Lieux</a>
        <a href="#">Catégories</a>
      </nav>
      
      <!-- Boutons d'action à droite -->
      <div class="actions">
        <!-- Bouton Notifications -->
        <button class="icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        <!-- Bouton Favoris -->
        <button class="icon-btn" aria-label="Favoris">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        
        <!-- Lien de connexion -->
        <a href="#" class="sign-in">Se connecter</a>
        <!-- Bouton d'achat -->
        <button class="get-tickets-btn">Acheter des billets</button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 5%;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 100;
      font-family: var(--font-body);
    }

    .logo {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 800;
      .sene { color: #111827; }
      .ticket { color: #FFC107; }
    }

    .nav-links {
      display: flex;
      gap: 32px;
      a {
        text-decoration: none;
        color: #4B5563;
        font-weight: 500;
        font-size: 0.95rem;
        position: relative;
        padding-bottom: 4px;
        transition: color 0.2s;

        &:hover, &.active {
          color: #FFC107;
        }

        &.active::after {
          content: '';
          position: absolute;
          bottom: -16px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #FFC107;
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 24px;

      .icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #4B5563;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px; /* UX Pro Max: Cible tactile minimum 44x44pt */
        height: 44px;
        border-radius: 50%;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          color: #FFC107;
          background: rgba(255, 193, 7, 0.1);
        }
        
        &:active {
          transform: scale(0.92); /* UX Pro Max: Retour visuel (Press feedback) */
        }
        
        &:focus-visible {
          outline: 2px solid #FFC107; /* UX Pro Max: Focus ring pour accessibilité clavier */
          outline-offset: 2px;
        }
      }

      .sign-in {
        text-decoration: none;
        color: #FFC107;
        font-weight: 600;
        font-size: 0.95rem;
        transition: color 0.2s;

        &:hover {
          color: #0B7A75;
        }
      }

      .get-tickets-btn {
        background: #FFC107;
        color: #111827;
        border: none;
        padding: 12px 24px; /* Hauteur ajustée pour la cible tactile */
        border-radius: 9999px;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 6px -1px rgba(255, 193, 7, 0.2), 0 2px 4px -1px rgba(255, 193, 7, 0.1);

        &:hover {
          background: #F5B041;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(255, 193, 7, 0.3), 0 4px 6px -2px rgba(255, 193, 7, 0.15);
        }
        
        &:active {
          transform: scale(0.96); /* Effet tactile élastique (Spring physics) */
          box-shadow: 0 2px 4px -1px rgba(255, 193, 7, 0.2);
        }

        &:focus-visible {
          outline: 2px solid #FFC107;
          outline-offset: 4px;
        }
      }
    }
  `]
})
export class HeaderComponent {}
