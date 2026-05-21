import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="header-wrapper" [class.menu-open]="isMenuOpen">
      <header class="header-pill">
        <div class="logo-section">
          <div class="logo" routerLink="/">
            <span class="sene">Sene</span><span class="ticket">Ticket</span>
          </div>
          <span class="badge">SÉNÉGAL</span>
        </div>
        
        <!-- Liens de navigation centrés -->
        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Produit</a>
          <a routerLink="/lieux" routerLinkActive="active">Lieux</a>
          <a routerLink="/categories" routerLinkActive="active">Catégories</a>
          <ng-container *ngIf="authService.estConnecte()">
            <a routerLink="/dashboard/admin" routerLinkActive="active" *ngIf="authService.aRole('admin')">Administration</a>
            <a routerLink="/dashboard/organisateur" routerLinkActive="active" *ngIf="authService.aRole('agent')">Dashboard</a>
          </ng-container>
        </nav>
        
        <!-- Boutons d'action à droite -->
        <div class="actions">
          <ng-container *ngIf="!authService.estConnecte()">
            <a routerLink="/auth/login" class="sign-in desktop-only">Se connecter</a>
            <a routerLink="/auth/login" class="get-tickets-btn desktop-only">
              Créer un événement
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </ng-container>

          <ng-container *ngIf="authService.estConnecte()">
            <div class="user-profile desktop-only">
              <span class="user-name">{{ (authService.currentUser$ | async)?.nomComplet }}</span>
              <span class="user-role-badge">{{ (authService.currentUser$ | async)?.role }}</span>
            </div>
            <a (click)="authService.deconnexion()" class="sign-in desktop-only" style="cursor: pointer;">Déconnexion</a>
            
            <a routerLink="/creer-evenement" class="get-tickets-btn desktop-only" *ngIf="authService.aRole('admin') || authService.aRole('agent')">
              Créer un événement
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </ng-container>
          
          <!-- Menu Toggle for Mobile -->
          <button class="mobile-menu-btn" (click)="isMenuOpen = !isMenuOpen">
            <svg *ngIf="!isMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg *ngIf="isMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <!-- Mobile Dropdown Menu -->
      <div class="mobile-dropdown" *ngIf="isMenuOpen">
        <nav class="mobile-nav">
          <a routerLink="/" (click)="isMenuOpen = false">Produit</a>
          <a routerLink="/lieux" (click)="isMenuOpen = false">Lieux</a>
          <a routerLink="/categories" (click)="isMenuOpen = false">Catégories</a>
          <a routerLink="/dashboard" (click)="isMenuOpen = false" *ngIf="authService.aRole('admin') || authService.aRole('agent')">Dashboard</a>
        </nav>
        <div class="mobile-actions">
          <ng-container *ngIf="!authService.estConnecte()">
            <a routerLink="/auth/login" (click)="isMenuOpen = false" class="sign-in-mobile">Se connecter</a>
            <button routerLink="/auth/login" (click)="isMenuOpen = false" class="get-tickets-mobile">Créer un événement</button>
          </ng-container>
          <ng-container *ngIf="authService.estConnecte()">
            <a (click)="authService.deconnexion(); isMenuOpen = false" class="sign-in-mobile" style="cursor: pointer;">Déconnexion</a>
            <button routerLink="/creer-evenement" (click)="isMenuOpen = false" class="get-tickets-mobile" *ngIf="authService.aRole('admin') || authService.aRole('agent')">Créer un événement</button>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header-wrapper {
      position: sticky;
      top: 24px;
      z-index: 100;
      padding: 0 5%;
      pointer-events: none;
    }

    .header-pill {
      pointer-events: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 10px 32px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 9999px;
      max-width: 1200px;
      margin: 0 auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Ombre douce recommandée par DESIGN.md */
      font-family: var(--font-body);
      transition: all 0.3s ease;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .logo {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      cursor: pointer;
      color: #333333; /* Dark Charcoal */
      .ticket { color: #FFD700; } /* Primary Gold */
    }

    .badge {
      border: 1px solid rgba(255, 215, 0, 0.5); /* Primary Gold outline */
      color: #705d00; /* Variant of Gold for readability */
      padding: 6px 14px;
      border-radius: 100px; /* Pill shape pour badges selon DESIGN.md */
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      background: rgba(255, 215, 0, 0.1);
      display: flex;
      align-items: center;
      @media (max-width: 600px) {
        display: none; /* Masquer le badge sur très petit écran pour gagner de la place */
      }
    }

    .nav-links {
      display: flex;
      gap: 32px;
      align-items: center;
      
      @media (max-width: 900px) {
        display: none;
      }

      a {
        text-decoration: none;
        color: #4d4732; /* On-surface-variant */
        font-weight: 500;
        font-size: 0.95rem;
        transition: color 0.2s ease;

        &:hover {
          color: #333333; /* Charcoal */
        }

        &.active {
          color: #333333;
          font-weight: 600;
        }
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 24px;

      .sign-in {
        text-decoration: none;
        color: #333333; /* Charcoal */
        font-weight: 600;
        font-size: 0.95rem;
        transition: color 0.2s;

        &:hover {
          color: #705d00; /* Hover au Gold sombre */
        }
      }
      
      .user-profile {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        line-height: 1.2;
        
        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: #111;
        }
        
        .user-role-badge {
          font-size: 0.7rem;
          background: #f1f3f5;
          padding: 2px 6px;
          border-radius: 4px;
          color: #666;
          text-transform: uppercase;
        }
      }

      .get-tickets-btn {
        background: #FFD700; /* Primary Gold */
        color: #333333; /* Charcoal */
        border: none;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 9999px; /* Bouton pillule conservé car navbar pillule */
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;

        svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }

        &:hover {
          background: #e9c400; /* Hover state */
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12); /* Interactive depth from DESIGN.md */
          
          svg {
            transform: translateX(4px);
          }
        }
        
        &:active {
          transform: scale(0.98);
        }

        &:focus-visible {
          outline: 2px solid #FFD700;
          outline-offset: 2px;
        }
      }
    }

    /* === MOBILE MENU STYLES === */
    .desktop-only {
      @media (max-width: 900px) { display: none !important; }
    }

    .mobile-menu-btn {
      display: none;
      background: transparent;
      border: none;
      color: #333333;
      padding: 8px;
      cursor: pointer;
      @media (max-width: 900px) { display: flex; align-items: center; justify-content: center; }
      svg { width: 24px; height: 24px; }
    }

    .mobile-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      left: 5%;
      right: 5%;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      padding: 24px;
      pointer-events: auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
      border: 1px solid rgba(0,0,0,0.05);
      animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 16px;
      a { text-decoration: none; color: #111827; font-size: 1.1rem; font-weight: 600; padding: 8px 0; border-bottom: 1px solid #F3F4F6; }
    }

    .mobile-actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
      
      .sign-in-mobile { text-align: center; color: #333333; font-weight: 700; text-decoration: none; padding: 12px; }
      .get-tickets-mobile { background: #FFD700; color: #333333; border: none; padding: 14px; border-radius: 12px; font-weight: 700; font-size: 1rem; box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3); }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;
  authService = inject(AuthService);
}

