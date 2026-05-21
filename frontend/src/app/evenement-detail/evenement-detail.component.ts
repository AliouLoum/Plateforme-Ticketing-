import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReservationService, ReservationData } from '../services/reservation.service';
import AOS from 'aos';

@Component({
  selector: 'app-evenement-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.scss']
})
export class EvenementDetailComponent implements OnInit {
  eventId: string = '';
  selectedTickets: { [key: string]: number } = {};

  evenement = {
    id: '1',
    titre: 'Festival de Dakar 2025',
    description: 'Le plus grand festival de musique d\'Afrique de l\'Ouest revient à Dakar ! Rejoignez-nous pour une soirée inoubliable avec les meilleurs artistes du continent. Afrobeats, Mbalax, Hip-Hop et bien plus encore dans un cadre exceptionnel.',
    categorie: 'Musique',
    date: '15 Décembre 2025',
    heure: '19h00 - 04h00',
    lieu: 'Grand Théâtre National',
    adresse: 'Boulevard Général de Gaulle, Dakar',
    ville: 'Dakar',
    image: 'images/event-music.jpeg',
    organisateur: 'Aliou Loum',
    tickets: [
      { id: 'standard', nom: 'Standard', prix: 5000, description: 'Accès général au festival', disponible: 358 },
      { id: 'vip', nom: 'VIP', prix: 15000, description: 'Accès VIP + boissons offertes + espace lounge', disponible: 42 },
      { id: 'vvip', nom: 'VVIP', prix: 50000, description: 'Accès backstage + rencontre artistes + table réservée', disponible: 8 }
    ],
    programme: [
      { heure: '19h00', titre: 'Ouverture des portes' },
      { heure: '20h00', titre: 'DJ Set — Warm Up' },
      { heure: '21h30', titre: 'Concert Live — Artiste Principal' },
      { heure: '23h00', titre: 'Show spécial — Guest Surprise' },
      { heure: '00h30', titre: 'After Party' }
    ],
    infos: [
      { icon: 'parking', label: 'Parking gratuit' },
      { icon: 'wifi', label: 'WiFi disponible' },
      { icon: 'food', label: 'Restauration sur place' },
      { icon: 'pmr', label: 'Accès PMR' }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private reservationService: ReservationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id') || '1';
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ duration: 400, easing: 'ease-out-cubic', once: true, offset: 50 });
    }
  }

  addTicket(ticketId: string) {
    if (!this.selectedTickets[ticketId]) this.selectedTickets[ticketId] = 0;
    const ticket = this.evenement.tickets.find(t => t.id === ticketId);
    if (ticket && this.selectedTickets[ticketId] < ticket.disponible) {
      this.selectedTickets[ticketId]++;
    }
  }

  removeTicket(ticketId: string) {
    if (this.selectedTickets[ticketId] && this.selectedTickets[ticketId] > 0) {
      this.selectedTickets[ticketId]--;
    }
  }

  getTicketCount(ticketId: string): number {
    return this.selectedTickets[ticketId] || 0;
  }

  get totalAmount(): number {
    let total = 0;
    for (const t of this.evenement.tickets) {
      total += (this.selectedTickets[t.id] || 0) * t.prix;
    }
    return total;
  }

  get totalTickets(): number {
    let total = 0;
    for (const key of Object.keys(this.selectedTickets)) {
      total += this.selectedTickets[key];
    }
    return total;
  }

  formatPrice(val: number): string {
    return val.toLocaleString('fr-FR');
  }

  acheter() {
    if (!this.authService.estConnecte()) {
      alert("Veuillez vous connecter pour continuer votre réservation.");
      this.router.navigate(['/auth/login']);
      return;
    }

    const selectedTicketDetails = [];
    for (const t of this.evenement.tickets) {
      if (this.selectedTickets[t.id] > 0) {
        selectedTicketDetails.push({
          id: t.id,
          nom: t.nom,
          prix: t.prix,
          quantite: this.selectedTickets[t.id]
        });
      }
    }

    if (selectedTicketDetails.length === 0) return;

    const reservationData: ReservationData = {
      eventId: this.eventId,
      titre: this.evenement.titre,
      image: this.evenement.image,
      date: this.evenement.date,
      lieu: this.evenement.lieu,
      tickets: selectedTicketDetails,
      totalAmount: this.totalAmount,
      totalTickets: this.totalTickets
    };

    this.reservationService.setReservation(reservationData);
    this.router.navigate(['/checkout']);
  }
}
