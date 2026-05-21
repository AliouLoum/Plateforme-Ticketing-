import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
      this.startCarouselAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    this.stopCarouselAutoPlay();
  }

  // Liste des catégories d'événements à afficher
  categories = [
    { nom: 'Musique', couleurFond: '#E0F7FA', couleurIcone: '#00B0FF' },
    { nom: 'Arts', couleurFond: '#E8F5E9', couleurIcone: '#00C853' },
    { nom: 'Sports', couleurFond: '#E3F2FD', couleurIcone: '#2962FF' },
    { nom: 'Festivals', couleurFond: '#FBE9E7', couleurIcone: '#FF3D00' }
  ];

  // Marquee keywords
  marqueeItems = [
    'Paiement Wave & Orange Money',
    'Billetterie 24h/7j',
    'QR Code Anti-Fraude',
    'Support WhatsApp',
    'Dashboard Temps Réel',
    'Remboursement en 1 clic',
    'Check-in Instantané',
    '+500 Événements'
  ];

  // Types d'événements (secteurs)
  typesEvenements = [
    { nom: 'Concerts & Soirées', description: 'Festivals de musique, DJ sets, soirées privées', icon: 'music', count: '200+' },
    { nom: 'Conférences & Séminaires', description: 'Talks, workshops, formations professionnelles', icon: 'mic', count: '85+' },
    { nom: 'Sport & Compétitions', description: 'Matchs, tournois, courses et marathons', icon: 'trophy', count: '120+' },
    { nom: 'Culture & Arts', description: 'Expositions, théâtre, cinéma et galeries', icon: 'palette', count: '95+' }
  ];

  // NOUVEAU : Destinations phares (Inspiré d'Eventbrite)
  topDestinations = [
    { nom: 'Dakar', image: 'images/Dakar.jpg', nbEvenements: 45 },
    { nom: 'Saly', image: 'images/vue-aerienne-jumbo-le-saly_849041_panohd.avif', nbEvenements: 12 },
    { nom: 'Saint-Louis', image: 'images/Saint_louis.jpg', nbEvenements: 8 },
    { nom: 'Cap Skirring', image: 'images/cap_skirring.jpg', nbEvenements: 5 },
    { nom: 'Touba', image: 'images/touba.jpg', nbEvenements: 3 }
  ];

  // Les événements mis en avant sur la page d'accueil (Carousel 3D)
  evenementsAlaUne = [
    {
      titre: 'Festival International de Musique de Dakar',
      categorie: 'MUSIQUE',
      date: '15 OCT',
      lieu: 'Monument de la Renaissance',
      prix: '5 000 XOF',
      image: 'images/monument_de_la_renaissance.jpg',
      misEnAvant: true
    },
    {
      titre: 'Expo d\'Art Contemporain Africain',
      categorie: 'ARTS',
      date: '02 Nov',
      lieu: 'Musée des Civilisations',
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
    },
    {
      titre: 'Dakar Fashion Week',
      categorie: 'MODE',
      date: '20 Déc',
      lieu: 'Radisson Blu',
      image: 'images/grand_theatre.jpeg',
      misEnAvant: false
    },
    {
      titre: 'Tech Africa Summit 2026',
      categorie: 'TECH',
      date: '12 Jan',
      lieu: 'CICAD Diamniadio',
      image: 'images/tech-conference.jpg',
      misEnAvant: false
    }
  ];

  // Carousel State
  carouselIndex = 2;
  private carouselInterval: any;

  getCarouselPos(index: number): number {
    const total = this.evenementsAlaUne.length;
    const offset = index - this.carouselIndex;
    let pos = (offset + total) % total;
    if (pos > Math.floor(total / 2)) {
      pos = pos - total;
    }
    return pos;
  }

  nextCarousel() {
    this.carouselIndex = (this.carouselIndex + 1) % this.evenementsAlaUne.length;
  }

  prevCarousel() {
    this.carouselIndex = (this.carouselIndex - 1 + this.evenementsAlaUne.length) % this.evenementsAlaUne.length;
  }

  startCarouselAutoPlay() {
    this.carouselInterval = setInterval(() => {
      this.nextCarousel();
    }, 4000);
  }

  stopCarouselAutoPlay() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

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
    { numero: '02', titre: 'Réservez', description: 'Achetez votre billet en quelques clics via Wave, Orange Money ou Carte Bancaire.' },
    { numero: '03', titre: 'Votre Billet QR Code', description: 'Recevez instantanément votre billet digital sous format QR Code, prêt à être scanné à l\'entrée.' }
  ];

  // Avantages dédiés aux Organisateurs (Inspiré Dashboard B2B)
  avantagesOrganisateurs = [
    {
      titre: 'Tableau de bord en temps réel',
      description: 'Suivez vos ventes de billets, le chiffre d\'affaires et les statistiques d\'audience en direct.',
      icon: 'bar-chart'
    },
    {
      titre: 'Scan Rapide & Check-in',
      description: 'Une application dédiée pour scanner les QR Codes des participants à l\'entrée en une fraction de seconde.',
      icon: 'qr-code'
    },
    {
      titre: 'Paiements Sécurisés',
      description: 'Recevez vos fonds rapidement et en toute sécurité, avec une transparence totale sur les transactions.',
      icon: 'shield'
    },
    {
      titre: 'Outils Marketing',
      description: 'Communiquez facilement avec vos participants et boostez votre visibilité.',
      icon: 'megaphone'
    }
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
    this.startAutoPlay();
  }

  // === TÉMOIGNAGES ===
  temoignages = [
    {
      nom: 'Ousmane Diallo',
      role: 'Organisateur de festivals',
      ville: 'Dakar',
      photo: '',
      initiales: 'OD',
      texte: 'Avant SeneTicket, je perdais des heures à vérifier qui avait payé via Orange Money. Maintenant tout est automatique, je me concentre sur l\'événement.',
      note: 5
    },
    {
      nom: 'Aïssatou Ndiaye',
      role: 'Participante régulière',
      ville: 'Saly',
      photo: '',
      initiales: 'AN',
      texte: 'Le QR Code c\'est magique ! Plus besoin d\'imprimer un billet. Je montre mon téléphone et j\'entre en 2 secondes.',
      note: 5
    },
    {
      nom: 'Ibrahima Fall',
      role: 'Manager artistique',
      ville: 'Saint-Louis',
      photo: '',
      initiales: 'IF',
      texte: 'Le dashboard en temps réel m\'a permis de voir en direct les ventes du concert de Wally Seck. On a ajusté notre com\' en live. Résultat : sold out.',
      note: 5
    },
    {
      nom: 'Mariama Sow',
      role: 'Organisatrice de conférences',
      ville: 'Dakar',
      photo: '',
      initiales: 'MS',
      texte: 'Le support WhatsApp est incroyable. J\'ai eu une réponse en 5 minutes un dimanche soir. Ils sont vraiment dédiés.',
      note: 4
    }
  ];

  // === FAQ ===
  activeQuestionIndex: number | null = null;

  faqItems = [
    {
      question: 'Comment acheter un billet sur SeneTicket ?',
      reponse: 'C\'est simple ! Trouvez votre événement, sélectionnez le nombre de places, puis payez via Wave, Orange Money ou carte bancaire. Vous recevez votre QR Code instantanément par SMS et email.'
    },
    {
      question: 'Quels moyens de paiement sont acceptés ?',
      reponse: 'Nous acceptons Wave, Orange Money, Free Money et les cartes bancaires (Visa, Mastercard). Tous les paiements sont sécurisés et chiffrés.'
    },
    {
      question: 'Que se passe-t-il si l\'événement est annulé ?',
      reponse: 'En cas d\'annulation par l\'organisateur, vous êtes remboursé automatiquement sous 48h sur votre moyen de paiement d\'origine. Aucune démarche à faire.'
    },
    {
      question: 'Comment fonctionne le QR Code à l\'entrée ?',
      reponse: 'Chaque billet contient un QR Code unique. À l\'entrée de l\'événement, l\'organisateur scanne votre QR depuis son téléphone avec l\'app SeneTicket. C\'est instantané et anti-fraude.'
    },
    {
      question: 'Je suis organisateur, comment créer un événement ?',
      reponse: 'Créez un compte gratuit, cliquez sur "Créer un événement", remplissez les informations (date, lieu, prix, catégories) et publiez ! Vous aurez accès à un dashboard complet pour suivre vos ventes en temps réel.'
    },
    {
      question: 'Y a-t-il des frais pour les organisateurs ?',
      reponse: 'La création d\'événements est gratuite. SeneTicket prend une petite commission sur chaque billet vendu. Pas de frais cachés, pas d\'abonnement mensuel.'
    }
  ];

  toggleQuestion(index: number) {
    this.activeQuestionIndex = this.activeQuestionIndex === index ? null : index;
  }
}
