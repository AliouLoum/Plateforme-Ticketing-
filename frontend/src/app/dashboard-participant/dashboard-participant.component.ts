import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-dashboard-participant',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-participant.component.html',
  styleUrls: ['./dashboard-participant.component.scss']
})
export class DashboardParticipantComponent implements OnInit {
  sidebarOpen = true;
  activeMenu = 'mes-billets';

  participant = {
    prenom: 'Aliou',
    nom: 'Diallo',
    email: 'aliou.diallo@example.com',
    avatar: ''
  };

  billetsAVenir = [
    {
      id: 'SN-849302',
      titre: 'Festival International de Musique de Dakar',
      date: '15 OCT 2025',
      heure: '20h00',
      lieu: 'Monument de la Renaissance',
      image: 'images/monument_de_la_renaissance.jpg',
      typeBillet: 'Standard',
      quantite: 1,
      qrData: 'QR-SN-849302-DATA'
    },
    {
      id: 'SN-481923',
      titre: 'Expo d\'Art Contemporain Africain',
      date: '02 NOV 2025',
      heure: '10h00',
      lieu: 'Musée des Civilisations',
      image: 'images/musee_civil_noir.jpg',
      typeBillet: 'VIP',
      quantite: 2,
      qrData: 'QR-SN-481923-DATA'
    }
  ];

  evenementsPasses = [
    {
      id: 'SN-102934',
      titre: 'Dakar Tech Meetup',
      date: '10 FÉV 2024',
      lieu: 'Place du Souvenir',
      image: 'images/tech-conference.jpg'
    }
  ];

  selectedTicket: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ duration: 400, easing: 'ease-out-cubic', once: true });
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setMenu(menu: string) {
    this.activeMenu = menu;
  }

  openTicketModal(billet: any) {
    this.selectedTicket = billet;
  }

  closeTicketModal() {
    this.selectedTicket = null;
  }
}
