import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Billet, FiltresBillet, ResultatPagine, CreerBilletDto, Commentaire } from '../models';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/tickets`;

  obtenirBillets(filtres?: FiltresBillet): Observable<ResultatPagine<Billet>> {
    let params = new HttpParams();
    if (filtres) {
      Object.entries(filtres).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }
    return this.http.get<ResultatPagine<Billet>>(this.baseUrl, { params });
  }

  obtenirBilletParId(id: string): Observable<Billet> {
    return this.http.get<Billet>(`${this.baseUrl}/${id}`);
  }

  creerBillet(payload: CreerBilletDto): Observable<Billet> {
    return this.http.post<Billet>(this.baseUrl, payload);
  }

  mettreAJourBillet(id: string, payload: Partial<Billet>): Observable<Billet> {
    return this.http.put<Billet>(`${this.baseUrl}/${id}`, payload);
  }

  supprimerBillet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  obtenirCommentairesBillet(id: string): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseUrl}/${id}/comments`);
  }
}
