import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-grid">
          
          <!-- Colonne 1: Organiser -->
          <div class="footer-col">
            <h4>Organiser</h4>
            <a href="#">Créer un événement</a>
            <a href="#">Tarification</a>
            <a href="#">Plateforme de billetterie</a>
            <a href="#">Application Organisateur</a>
            <a href="#">Guide d'organisation</a>
          </div>

          <!-- Colonne 2: Découvrir -->
          <div class="footer-col">
            <h4>Découvrir</h4>
            <a href="#">Événements à Dakar</a>
            <a href="#">Événements à Saly</a>
            <a href="#">Concerts & Musique</a>
            <a href="#">Festivals</a>
            <a href="#">Événements Sportifs</a>
          </div>

          <!-- Colonne 3: SeneTicket -->
          <div class="footer-col">
            <h4>SeneTicket</h4>
            <a href="#">À propos</a>
            <a href="#">Carrières</a>
            <a href="#">Presse</a>
            <a href="#">Nous contacter</a>
          </div>

          <!-- Colonne 4: Légal & Support -->
          <div class="footer-col">
            <h4>Légal & Support</h4>
            <a href="#">Centre d'aide</a>
            <a href="#">Conditions d'utilisation</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Politique de remboursement</a>
            <a href="#">Accessibilité</a>
          </div>

          <!-- Colonne 5: Marque & Réseaux Sociaux -->
          <div class="footer-col brand-col">
            <div class="logo">
              <span class="sene">Sene</span><span class="ticket">Ticket</span>
            </div>
            <p>La référence de l'événementiel au Sénégal. Découvrez et réservez facilement vos expériences.</p>
            <div class="social-icons">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} SeneTicket. Tous droits réservés.</p>
        <div class="country-selector">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          Sénégal (FR)
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #000000;
      color: #D1D5DB;
      font-family: var(--font-body);
      border-top: 1px solid #1F2937;
    }

    .footer-top {
      padding: 80px 5% 60px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr) 1.5fr;
      gap: 32px;
      max-width: 1300px;
      margin: 0 auto;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 16px;

      h4 {
        color: #FFFFFF;
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 8px;
        letter-spacing: 0.5px;
      }

      a {
        color: #9CA3AF;
        text-decoration: none;
        font-size: 0.95rem;
        transition: color 0.2s;

        &:hover {
          color: #FFC107;
          text-decoration: underline;
        }
      }
    }

    .brand-col {
      .logo {
        font-size: 1.8rem;
        font-weight: 900;
        margin-bottom: 8px;
        .sene { color: #FFFFFF; }
        .ticket { color: #FFC107; }
      }
      
      p {
        color: #9CA3AF;
        line-height: 1.6;
        font-size: 0.95rem;
        margin-bottom: 16px;
      }

      .social-icons {
        display: flex;
        gap: 12px;

        a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #374151;
          color: #D1D5DB;
          transition: all 0.2s;

          &:hover {
            color: #111827;
            border-color: #FFC107;
            background: #FFC107;
          }
        }
      }
    }

    .footer-bottom {
      border-top: 1px solid #1F2937;
      padding: 24px 5%;
      max-width: 1300px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #9CA3AF;
      font-size: 0.9rem;

      @media (max-width: 600px) {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .country-selector {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: color 0.2s;
        &:hover { color: #FFFFFF; }
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
