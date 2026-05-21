import { Injectable } from '@angular/core';

export interface ReservationData {
  eventId: string;
  titre: string;
  image: string;
  date: string;
  lieu: string;
  tickets: {
    id: string;
    nom: string;
    prix: number;
    quantite: number;
  }[];
  totalAmount: number;
  totalTickets: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private currentReservation: ReservationData | null = null;

  setReservation(data: ReservationData) {
    this.currentReservation = data;
  }

  getReservation(): ReservationData | null {
    return this.currentReservation;
  }

  clearReservation() {
    this.currentReservation = null;
  }
}
