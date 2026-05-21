import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Projet, Billet, ResultatPagine } from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/projects`;

  obtenirProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.baseUrl);
  }

  obtenirProjetParId(id: string): Observable<Projet> {
    return this.http.get<Projet>(`${this.baseUrl}/${id}`);
  }

  obtenirBilletsProjet(id: string, filtres?: { page?: number; limite?: number }): Observable<ResultatPagine<Billet>> {
    let params = new HttpParams();
    if (filtres) {
      if (filtres.page) params = params.set('page', filtres.page.toString());
      if (filtres.limite) params = params.set('limit', filtres.limite.toString());
    }
    return this.http.get<ResultatPagine<Billet>>(`${this.baseUrl}/${id}/tickets`, { params });
  }
}
