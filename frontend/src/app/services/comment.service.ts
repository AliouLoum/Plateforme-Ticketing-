import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Commentaire, CreerCommentaireDto } from '../models';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/comments`;

  ajouterCommentaire(payload: CreerCommentaireDto): Observable<Commentaire> {
    return this.http.post<Commentaire>(this.baseUrl, payload);
  }

  mettreAJourCommentaire(id: string, contenu: string): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.baseUrl}/${id}`, { contenu });
  }

  supprimerCommentaire(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
