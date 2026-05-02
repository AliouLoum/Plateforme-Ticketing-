import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Initialisation des animations au défilement (quand on scroll)
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 400,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
      });
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  // Liste des catégories d'événements à afficher
  categories = [
    { nom: 'Musique', couleurFond: '#E0F7FA', couleurIcone: '#00B0FF' },
    { nom: 'Arts', couleurFond: '#E8F5E9', couleurIcone: '#00C853' },
    { nom: 'Sports', couleurFond: '#E3F2FD', couleurIcone: '#2962FF' },
    { nom: 'Festivals', couleurFond: '#FBE9E7', couleurIcone: '#FF3D00' }
  ];

  // NOUVEAU : Destinations phares (Inspiré d'Eventbrite)
  topDestinations = [
    { nom: 'Dakar', image: 'images/Dakar.jpg', nbEvenements: 45 },
    { nom: 'Saly', image: 'images/vue-aerienne-jumbo-le-saly_849041_panohd.avif', nbEvenements: 12 },
    { nom: 'Saint-Louis', image: 'images/Saint_louis.jpg', nbEvenements: 8 },
    { nom: 'Cap Skirring', image: 'images/cap_skirring.jpg', nbEvenements: 5 },
    { nom: 'Touba', image: 'images/touba.jpg', nbEvenements: 3 }
  ];

  // Les événements mis en avant sur la page d'accueil
  evenementsAlaUne = [
    {
      titre: 'Festival International de Musique de Dakar',
      categorie: 'MUSIQUE',
      date: '15 OCT',
      lieu: 'Monument de la Renaissance, Dakar',
      prix: '5 000 XOF',
      image: 'images/monument_de_la_renaissance.jpg',
      misEnAvant: true
    },
    {
      titre: 'Expo d\'Art Contemporain Africain',
      categorie: 'ARTS',
      date: '02 Nov',
      lieu: 'Musée des Civilisations Noires',
      image: 'images/musee_civil_noir.jpg',
      misEnAvant: false
    },
    {
      titre: 'Championnat de Lutte Sénégalaise',
      categorie: 'SPORTS',
      date: '10 Déc',
      lieu: 'Stade Abdoulaye Wade',
      image: 'images/stade_abdoulaye_wade.jpg',
      misEnAvant: false
    }
  ];

  // Les points forts (pourquoi choisir notre plateforme)
  avantages = [
    { 
      titre: 'Paiements Sécurisés', 
      description: 'Vos transactions sont protégées avec les standards de sécurité les plus élevés via Mobile Money (Orange Money, Wave) et Cartes Bancaires.',
      image: 'images/mobile-home.png'
    },
    { 
      titre: 'Outils Organisateurs', 
      description: 'Gérez vos ventes, suivez vos statistiques en temps réel et analysez votre audience avec notre tableau de bord intuitif.',
      image: 'images/mobile-events.png'
    },
    { 
      titre: 'Check-in Simplifié', 
      description: 'Oubliez le papier. Scannez directement les QR codes à l\'entrée avec notre application dédiée pour un accès rapide.',
      image: 'images/mobile-categories.png'
    }
  ];

  // Les étapes pour expliquer comment ça marche aux utilisateurs
  etapes = [
    { numero: '01', titre: 'Découvrez', description: 'Parcourez notre catalogue varié, des concerts aux festivals, en passant par le sport et la culture.' },
    { numero: '02', titre: 'Réservez', description: 'Achetez votre billet en quelques clics et recevez-le instantanément par email ou SMS.' },
    { numero: '03', titre: 'Profitez', description: 'Présentez votre QR code directement sur votre smartphone à l\'entrée de l\'événement.' }
  ];

  // NOUVEAU : Statistiques pour la preuve sociale
  statistiques = [
    { valeur: '100K+', label: 'Billets Vendus' },
    { valeur: '500+', label: 'Événements Organisés' },
    { valeur: '250+', label: 'Partenaires' },
    { valeur: '99%', label: 'Satisfaction Client' }
  ];

  // NOUVEAU : Agenda rapide
  prochainsEvenements = [
    { jour: '20', mois: 'OCT', titre: 'Concert Youssou N\'Dour', lieu: 'Dakar Arena', heure: '20:00', image: 'images/agenda-dj.png' },
    { jour: '25', mois: 'OCT', titre: 'Dakar Fashion Week', lieu: 'Radisson Blu', heure: '18:30', image: 'images/agenda-mic.png' },
    { jour: '01', mois: 'NOV', titre: 'Marathon Eiffage', lieu: 'Corniche Ouest', heure: '07:00', image: 'images/event-sport.jpeg' },
    { jour: '12', mois: 'NOV', titre: 'Startup Weekend Dakar', lieu: 'Place du Souvenir', heure: '09:00', image: 'images/agenda-speaker.png' }
  ];

  // Gestion de l'accordéon pour la section App Showcase
  activeFeatureIndex: number = 0;
  private autoPlayInterval: any;

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.activeFeatureIndex = (this.activeFeatureIndex + 1) % this.avantages.length;
    }, 4000); // Change toutes les 4 secondes
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  toggleFeature(index: number) {
    this.activeFeatureIndex = index;
    this.stopAutoPlay();
    this.startAutoPlay(); // Redémarre le timer après l'interaction
  }
}
