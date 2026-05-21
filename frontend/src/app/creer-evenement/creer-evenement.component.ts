import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';

@Component({
  selector: 'app-creer-evenement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './creer-evenement.component.html',
  styleUrls: ['./creer-evenement.component.scss']
})
export class CreerEvenementComponent implements OnInit {
  currentStep = 1;
  totalSteps = 4;

  // Step 1: Infos de base
  eventName = '';
  eventCategory = '';
  eventDescription = '';

  // Step 2: Date & Lieu
  eventDate = '';
  eventTime = '';
  eventLocation = '';
  eventCity = '';
  eventAddress = '';

  // Step 3: Billetterie
  tickets: { nom: string; prix: number; quantite: number; description: string }[] = [
    { nom: 'Standard', prix: 5000, quantite: 100, description: 'Accès général' }
  ];
  acceptWave = true;
  acceptOM = true;
  acceptCard = false;

  // Step 4: Médias & Confirmation
  eventImagePreview = '';
  eventBannerText = '';
  publishNow = true;

  categories = [
    'Musique', 'Conférences', 'Sport', 'Festivals',
    'Théâtre & Humour', 'Tech', 'Arts & Culture', 'Autre'
  ];

  cities = ['Dakar', 'Saly', 'Saint-Louis', 'Thiès', 'Cap Skirring', 'Touba', 'Autre'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ duration: 400, easing: 'ease-out-cubic', once: true, offset: 50 });
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.scrollToTop();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.scrollToTop();
    }
  }

  goToStep(step: number) {
    if (step <= this.currentStep) {
      this.currentStep = step;
      this.scrollToTop();
    }
  }

  addTicket() {
    this.tickets.push({ nom: '', prix: 0, quantite: 50, description: '' });
  }

  removeTicket(index: number) {
    if (this.tickets.length > 1) {
      this.tickets.splice(index, 1);
    }
  }

  get totalPlaces(): number {
    return this.tickets.reduce((sum, t) => sum + t.quantite, 0);
  }

  get revenueEstime(): number {
    return this.tickets.reduce((sum, t) => sum + (t.prix * t.quantite), 0);
  }

  formatPrice(value: number): string {
    return value.toLocaleString('fr-FR');
  }

  submitEvent() {
    alert('🎉 Événement créé avec succès ! Vous recevrez un email de confirmation.');
    // TODO: Envoyer les données au backend
  }

  private scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
