import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import AOS from 'aos';

@Component({
  selector: 'app-lieux',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lieux.component.html',
  styleUrls: ['./lieux.component.scss']
})
export class LieuxComponent implements OnInit, AfterViewInit, OnDestroy {
  searchTerm: string = '';
  selectedTag: string = 'Tous';
  availableTags: string[] = [];

  private map: L.Map | undefined;
  private markers: L.LayerGroup | undefined;
  private customIcon = L.divIcon({
    className: 'custom-pin',
    html: `<svg width="32" height="32" viewBox="0 0 24 24" fill="#FFC107" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="#111827"></circle></svg>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  lieux = [
    {
      nom: 'Grand Théâtre National',
      galerie: ['images/grand_theatre.jpeg', 'images/event-music.jpeg'],
      activeImageIndex: 0,
      lieu: 'Dakar Centre',
      capacite: '1 800 places',
      description: 'Le joyau culturel du Sénégal, idéal pour les grands concerts, spectacles et cérémonies.',
      tags: ['Théâtre', 'Concerts', 'Climatisé'],
      commodites: ['parking', 'pmr', 'wifi', 'restauration'],
      coordonnees: [14.6738, -17.4336] as [number, number],
      evenementsAVenir: 3
    },
    {
      nom: 'Canal Olympia Teranga',
      galerie: ['images/canalolympia.jpg', 'images/event-art.jpeg'],
      activeImageIndex: 0,
      lieu: 'Dakar',
      capacite: '5 000 places (Ext)',
      description: 'L\'un des espaces les plus modernes pour les projections de films, festivals et concerts en plein air.',
      tags: ['Cinéma', 'Plein Air', 'Festivals'],
      commodites: ['parking', 'pmr', 'restauration'],
      coordonnees: [14.6775, -17.4360] as [number, number],
      evenementsAVenir: 1
    },
    {
      nom: 'Monument de la Renaissance Africaine',
      galerie: ['images/monument_de_la_renaissance.jpg', 'images/Dakar.jpg'],
      activeImageIndex: 0,
      lieu: 'Ouakam, Dakar',
      capacite: '10 000+ places',
      description: 'Un cadre majestueux et historique pour les événements à grande échelle et les festivals culturels.',
      tags: ['Monument', 'Esplanade', 'Plein Air'],
      commodites: ['parking', 'boutique'],
      coordonnees: [14.7226, -17.4947] as [number, number],
      evenementsAVenir: 5
    },
    {
      nom: 'CICES',
      galerie: ['images/CICES_23.jpg', 'images/Saint_louis.jpg'],
      activeImageIndex: 0,
      lieu: 'Foire, Dakar',
      capacite: '15 000+ places',
      description: 'Le Centre International du Commerce Extérieur du Sénégal, incontournable pour les foires et salons professionnels.',
      tags: ['Foire', 'Expositions', 'Conférences'],
      commodites: ['parking', 'pmr', 'wifi', 'restauration'],
      coordonnees: [14.7431, -17.4649] as [number, number],
      evenementsAVenir: 2
    },
    {
      nom: 'Musée des Civilisations Noires',
      galerie: ['images/musee_civil_noir.jpg', 'images/event-music.jpeg'],
      activeImageIndex: 0,
      lieu: 'Dakar Centre',
      capacite: '500 places',
      description: 'Un espace prestigieux pour les expositions d\'art, les conférences de presse et les lancements de produits haut de gamme.',
      tags: ['Musée', 'Culture', 'Premium'],
      commodites: ['parking', 'pmr', 'wifi', 'boutique'],
      coordonnees: [14.6713, -17.4313] as [number, number],
      evenementsAVenir: 0
    },
    {
      nom: 'Stade Abdoulaye Wade',
      galerie: ['images/stade_abdoulaye_wade.jpg', 'images/event-sport.jpeg'],
      activeImageIndex: 0,
      lieu: 'Diamniadio',
      capacite: '50 000 places',
      description: 'Le plus grand stade du pays, offrant des infrastructures de classe mondiale pour le sport et les méga-concerts.',
      tags: ['Stade', 'Sport', 'Méga-événements'],
      commodites: ['parking', 'pmr', 'restauration', 'vip'],
      coordonnees: [14.7369, -17.2023] as [number, number],
      evenementsAVenir: 4
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const tagsSet = new Set<string>();
    tagsSet.add('Tous');
    this.lieux.forEach(l => l.tags.forEach(t => tagsSet.add(t)));
    this.availableTags = Array.from(tagsSet);
  }

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

  get lieuxFiltres() {
    return this.lieux.filter(lieu => {
      const matchSearch = lieu.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          lieu.lieu.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchTag = this.selectedTag === 'Tous' || lieu.tags.includes(this.selectedTag);
      return matchSearch && matchTag;
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  initMap() {
    if (this.map) return;
    this.map = L.map('map-container').setView([14.70, -17.40], 11);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    this.markers = L.layerGroup().addTo(this.map);
    this.updateMapMarkers();
  }

  updateMapMarkers() {
    if (!this.map || !this.markers) return;

    this.markers.clearLayers();
    const currentLieux = this.lieuxFiltres;
    
    currentLieux.forEach(lieu => {
      if (lieu.coordonnees) {
        const marker = L.marker(lieu.coordonnees, { icon: this.customIcon })
          .bindPopup(`<b>${lieu.nom}</b><br>${lieu.lieu}`);
        this.markers?.addLayer(marker);
      }
    });

    if (currentLieux.length > 0) {
      const group = L.featureGroup(this.markers.getLayers());
      this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }

  onFilterChange() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.updateMapMarkers(), 100);
    }
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
    this.onFilterChange();
  }

  nextImage(lieu: any, event: Event) {
    event.stopPropagation();
    lieu.activeImageIndex = (lieu.activeImageIndex + 1) % lieu.galerie.length;
  }

  prevImage(lieu: any, event: Event) {
    event.stopPropagation();
    lieu.activeImageIndex = (lieu.activeImageIndex - 1 + lieu.galerie.length) % lieu.galerie.length;
  }

  openDirections(lieu: any) {
    if (lieu.coordonnees) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lieu.coordonnees[0]},${lieu.coordonnees[1]}`;
      window.open(url, '_blank');
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }
}
