import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarOpen = true;
  activeMenu = 'dashboard';
  activeSubmenu = '';

  organisateur = {
    nom: 'Aliou Loum',
    email: 'aliouloum2004@gmail.com',
    avatar: ''
  };

  stats = [
    { label: 'Total Tickets Vendus', value: '1 247', sublabel: 'CE MOIS', icon: 'ticket', trend: '+12%' },
    { label: 'Revenus Générés', value: '6 235 000 XOF', sublabel: 'CE MOIS', icon: 'revenue', trend: '+8%' },
    { label: 'Tickets Restants', value: '753', sublabel: 'ÉVÉNEMENTS ACTIFS', icon: 'stock', trend: '' },
    { label: 'Taux de Conversion', value: '68%', sublabel: 'VISITEURS → ACHETEURS', icon: 'conversion', trend: '+5%' }
  ];

  evenements = [
    {
      id: 1,
      titre: 'Festival de Dakar 2025',
      date: '15 Déc 2025',
      lieu: 'Grand Théâtre National',
      statut: 'Publié',
      ticketsVendus: 842,
      ticketsTotal: 1200,
      revenu: 4210000,
      categorie: 'Musique'
    },
    {
      id: 2,
      titre: 'Tech Africa Summit',
      date: '20 Nov 2025',
      lieu: 'CICES Dakar',
      statut: 'En attente',
      ticketsVendus: 0,
      ticketsTotal: 500,
      revenu: 0,
      categorie: 'Conférences'
    },
    {
      id: 3,
      titre: 'Match Sénégal vs Côte d\'Ivoire',
      date: '08 Jan 2026',
      lieu: 'Stade Abdoulaye Wade',
      statut: 'Brouillon',
      ticketsVendus: 0,
      ticketsTotal: 5000,
      revenu: 0,
      categorie: 'Sport'
    }
  ];

  ventesRecentes = [
    { nom: 'Ousmane Diallo', billet: 'VIP — Festival de Dakar', prix: 15000, date: 'Il y a 2 min', moyen: 'Wave' },
    { nom: 'Fatou Sow', billet: 'Standard — Festival de Dakar', prix: 5000, date: 'Il y a 15 min', moyen: 'Orange Money' },
    { nom: 'Moussa Ba', billet: 'VIP — Festival de Dakar', prix: 15000, date: 'Il y a 1h', moyen: 'Wave' },
    { nom: 'Aminata Ndiaye', billet: 'Standard — Festival de Dakar', prix: 5000, date: 'Il y a 2h', moyen: 'Carte bancaire' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ duration: 300, easing: 'ease-out-cubic', once: true, offset: 30 });
    }
  }

  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }

  setMenu(menu: string, submenu: string = '') {
    this.activeMenu = menu;
    this.activeSubmenu = submenu;
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'Publié': return 'status-published';
      case 'En attente': return 'status-pending';
      case 'Brouillon': return 'status-draft';
      default: return '';
    }
  }

  getProgressPercent(event: any): number {
    if (event.ticketsTotal === 0) return 0;
    return Math.round((event.ticketsVendus / event.ticketsTotal) * 100);
  }

  formatPrice(val: number): string {
    return val.toLocaleString('fr-FR');
  }
}
