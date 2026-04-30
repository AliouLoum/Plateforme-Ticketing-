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
          <!-- Colonne 1: Marque & Réseaux Sociaux -->
          <div class="footer-col brand-col">
            <div class="logo">
              <span class="sene">Sene</span><span class="ticket">Ticket</span>
            </div>
            <p>Des événements vibrants pour un Sénégal moderne.</p>
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
              <a href="#" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
            </div>
          </div>
          
          <!-- Colonne 2: Entreprise -->
          <div class="footer-col">
            <h4>Entreprise</h4>
            <a href="#">À propos</a>
            <a href="#">Nous contacter</a>
            <a href="#">Newsletter</a>
          </div>

          <!-- Colonne 3: Légal -->
          <div class="footer-col">
            <h4>Légal</h4>
            <a href="#">Conditions d'utilisation</a>
            <a href="#">Politique de confidentialité</a>
            <a href="#">Mentions légales</a>
            <a href="#">Centre d'aide</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #FFFFFF;
      color: #4B5563;
      font-family: var(--font-body);
      border-top: 1px solid #E5E7EB;
    }

    .footer-top {
      padding: 60px 5% 40px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto;

      @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 16px;

      h4 {
        color: #111827;
        font-size: 1.05rem;
        font-weight: 600;
        margin-bottom: 4px;
      }

      a {
        color: #4B5563;
        text-decoration: none;
        font-size: 0.95rem;
        transition: color 0.2s;

        &:hover {
          color: #FFC107;
        }
      }
    }

    .brand-col {
      .logo {
        font-size: 1.6rem;
        font-weight: 800;
        margin-bottom: 8px;
        .sene { color: #111827; }
        .ticket { color: #FFC107; }
      }
      
      p {
        color: #6B7280;
        line-height: 1.5;
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
          border: 1px solid #E5E7EB;
          color: #4B5563;
          transition: all 0.2s;

          &:hover {
            color: #FFFFFF;
            border-color: #FFC107;
            background: #FFC107;
          }
        }
      }
    }
  `]
})
export class FooterComponent {}
