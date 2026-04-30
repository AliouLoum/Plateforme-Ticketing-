import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lieux',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lieux.component.html',
  styleUrls: ['./lieux.component.scss']
})
export class LieuxComponent {
  lieux = [
    {
      nom: 'Grand Théâtre National',
      image: 'images/grand_theatre.jpeg',
      lieu: 'Dakar Centre',
      capacite: '1 800 places',
      description: 'Le joyau culturel du Sénégal, idéal pour les grands concerts, spectacles et cérémonies.',
      tags: ['Théâtre', 'Concerts', 'Climatisé']
    },
    {
      nom: 'Canal Olympia Teranga',
      image: 'images/canalolympia.jpg',
      lieu: 'Dakar',
      capacite: '5 000 places (Ext)',
      description: 'L\'un des espaces les plus modernes pour les projections de films, festivals et concerts en plein air.',
      tags: ['Cinéma', 'Plein Air', 'Festivals']
    },
    {
      nom: 'Monument de la Renaissance Africaine',
      image: 'images/monument_de_la_renaissance.jpg',
      lieu: 'Ouakam, Dakar',
      capacite: '10 000+ places',
      description: 'Un cadre majestueux et historique pour les événements à grande échelle et les festivals culturels.',
      tags: ['Monument', 'Esplanade', 'Plein Air']
    },
    {
      nom: 'CICES',
      image: 'images/CICES_23.jpg',
      lieu: 'Foire, Dakar',
      capacite: '15 000+ places',
      description: 'Le Centre International du Commerce Extérieur du Sénégal, incontournable pour les foires et salons professionnels.',
      tags: ['Foire', 'Expositions', 'Conférences']
    },
    {
      nom: 'Musée des Civilisations Noires',
      image: 'images/musee_civil_noir.jpg',
      lieu: 'Dakar Centre',
      capacite: '500 places',
      description: 'Un espace prestigieux pour les expositions d\'art, les conférences de presse et les lancements de produits haut de gamme.',
      tags: ['Musée', 'Culture', 'Premium']
    },
    {
      nom: 'Stade Abdoulaye Wade',
      image: 'images/stade_abdoulaye_wade.jpg',
      lieu: 'Diamniadio',
      capacite: '50 000 places',
      description: 'Le plus grand stade du pays, offrant des infrastructures de classe mondiale pour le sport et les méga-concerts.',
      tags: ['Stade', 'Sport', 'Méga-événements']
    }
  ];
}
