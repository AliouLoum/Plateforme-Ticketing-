import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Initialisation des animations au défilement (quand on scroll)
  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }

  // Liste des catégories d'événements à afficher
  categories = [
    { nom: 'Musique', couleurFond: '#E0F7FA', couleurIcone: '#00B0FF' },
    { nom: 'Arts', couleurFond: '#E8F5E9', couleurIcone: '#00C853' },
    { nom: 'Sports', couleurFond: '#E3F2FD', couleurIcone: '#2962FF' },
    { nom: 'Festivals', couleurFond: '#FBE9E7', couleurIcone: '#FF3D00' }
  ];

  // Les événements mis en avant sur la page d'accueil
  evenementsAlaUne = [
    {
      titre: 'Festival International de Musique de Dakar',
      categorie: 'MUSIQUE',
      date: '15 OCT',
      lieu: 'Monument de la Renaissance, Dakar',
      prix: '5 000 XOF',
      image: 'images/event-music.jpeg',
      misEnAvant: true
    },
    {
      titre: 'Expo d\'Art Contemporain Africain',
      categorie: 'ARTS',
      date: '02 Nov',
      lieu: 'Musée des Civilisations Noires',
      image: 'images/event-art.jpeg',
      misEnAvant: false
    },
    {
      titre: 'Championnat de Lutte Sénégalaise',
      categorie: 'SPORTS',
      date: '10 Déc',
      lieu: 'Stade Demba Diop',
      image: 'images/event-sport.jpeg',
      misEnAvant: false
    }
  ];

  // Les points forts (pourquoi choisir notre plateforme)
  avantages = [
    { 
      titre: 'Paiements Sécurisés', 
      description: 'Vos transactions sont protégées avec les standards de sécurité les plus élevés via Mobile Money (Orange Money, Wave) et Cartes Bancaires.' 
    },
    { 
      titre: 'Outils Organisateurs', 
      description: 'Gérez vos ventes, suivez vos statistiques en temps réel et analysez votre audience avec notre tableau de bord intuitif.' 
    },
    { 
      titre: 'Check-in Simplifié', 
      description: 'Oubliez le papier. Scannez directement les QR codes à l\'entrée avec notre application dédiée pour un accès rapide.' 
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
}
