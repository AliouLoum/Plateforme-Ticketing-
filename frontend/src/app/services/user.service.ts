import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Utilisateur } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/users`;

  obtenirUtilisateurs(role?: string): Observable<Utilisateur[]> {
    let params = new HttpParams();
    if (role) {
      params = params.set('role', role);
    }
    return this.http.get<Utilisateur[]>(this.baseUrl, { params });
  }

  obtenirUtilisateurCourant(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/me`);
  }

  obtenirUtilisateurParId(id: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/${id}`);
  }
}
