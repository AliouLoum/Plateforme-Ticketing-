import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService, ReservationData } from '../services/reservation.service';
import AOS from 'aos';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  reservation: ReservationData | null = null;
  currentStep: number = 1;
  checkoutForm: FormGroup;
  paymentMethod: 'wave' | 'orange_money' | 'cb' | null = null;
  isProcessing: boolean = false;
  ticketId: string = '';

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkoutForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.reservation = this.reservationService.getReservation();
    if (!this.reservation) {
      // Si on accède à /checkout sans réservation, on redirige vers l'accueil
      this.router.navigate(['/']);
    }

    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ duration: 400, easing: 'ease-out-cubic', once: true });
    }
  }

  formatPrice(val: number): string {
    return val.toLocaleString('fr-FR');
  }

  nextStep() {
    if (this.currentStep === 2 && this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    if (this.currentStep === 3 && !this.paymentMethod) {
      alert("Veuillez choisir un moyen de paiement.");
      return;
    }
    
    if (this.currentStep === 3) {
      this.processPayment();
    } else {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  setPaymentMethod(method: 'wave' | 'orange_money' | 'cb') {
    this.paymentMethod = method;
  }

  processPayment() {
    this.isProcessing = true;
    // Simuler le délai de paiement
    setTimeout(() => {
      this.isProcessing = false;
      this.currentStep = 4; // Succès
      this.ticketId = 'SN-' + Math.random().toString().substr(2, 6);
      this.reservationService.clearReservation();
    }, 2500);
  }
}
