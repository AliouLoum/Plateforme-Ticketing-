import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  searchTerm: string = '';
  selectedAmbiance: string = 'Toutes';

  ambiances = ['Toutes', 'Festif', 'Détente', 'Famille', 'Professionnel'];

  categories = [
    {
      id: 'musique',
      nom: 'Musique',
      description: 'Concerts, festivals, soirées DJ...',
      image: 'images/musique.jpg',
      evenements: 42,
      sousCategories: ['Afrobeats', 'Mbalax', 'Rap', 'Jazz', 'Live'],
      ambiances: ['Festif', 'Détente']
    },
    {
      id: 'arts',
      nom: 'Arts & Culture',
      description: 'Expositions, musées, danse...',
      image: 'images/art_culture.jpg',
      evenements: 15,
      sousCategories: ['Exposition', 'Peinture', 'Danse Traditionnelle'],
      ambiances: ['Détente', 'Famille']
    },
    {
      id: 'sports',
      nom: 'Sports',
      description: 'Matchs, tournois, marathons...',
      image: 'images/sport.jpg',
      evenements: 28,
      sousCategories: ['Lutte Sénégalaise', 'Football', 'Marathon', 'Basket'],
      ambiances: ['Festif', 'Famille']
    },
    {
      id: 'festivals',
      nom: 'Festivals',
      description: 'Événements en plein air, rassemblements...',
      image: 'images/festival.jpg',
      evenements: 5,
      sousCategories: ['Culturel', 'Gastronomique', 'Urbain'],
      ambiances: ['Festif', 'Famille']
    },
    {
      id: 'theatre',
      nom: 'Théâtre & Humour',
      description: 'Pièces de théâtre, stand-up, spectacles...',
      image: 'images/grand_theatre.jpeg',
      evenements: 12,
      sousCategories: ['Stand-up', 'Comédie', 'Pièce classique'],
      ambiances: ['Détente', 'Famille']
    },
    {
      id: 'tech',
      nom: 'Tech & Conférences',
      description: 'Salons professionnels, startups, networking...',
      image: 'images/tech-conference.jpg',
      evenements: 8,
      sousCategories: ['Startup', 'Networking', 'Formation', 'IA'],
      ambiances: ['Professionnel']
    }
  ];

  evenementsPhare = [
    {
      titre: 'Dakar Fashion Week 2026',
      date: '12 NOV',
      categorie: 'Arts & Culture',
      lieu: 'Radisson Blu',
      prix: '15 000 XOF',
      image: 'images/art_culture.jpg'
    },
    {
      titre: 'Concert Afrobeats XXL',
      date: '05 DEC',
      categorie: 'Musique',
      lieu: 'Stade Abdoulaye Wade',
      prix: '5 000 XOF',
      image: 'images/Afrobeats_concert_crowd_at_night_202604290121.jpeg'
    },
    {
      titre: 'Tech Africa Summit',
      date: '20 NOV',
      categorie: 'Tech & Conférences',
      lieu: 'CICES Dakar',
      prix: 'Gratuit',
      image: 'images/tech-conference.jpg'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 400,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
      });
    }
  }

  get categorieTendance() {
    // Pour l'exemple, on met "Musique" en tendance
    return this.categories.find(c => c.id === 'musique');
  }

  get filteredCategories() {
    return this.categories.filter(c => {
      const matchSearch = c.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          c.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchAmbiance = this.selectedAmbiance === 'Toutes' || c.ambiances.includes(this.selectedAmbiance);
      return matchSearch && matchAmbiance;
    });
  }

  selectAmbiance(amb: string) {
    this.selectedAmbiance = amb;
  }
}
