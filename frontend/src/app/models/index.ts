export interface ResultatPagine<T> {
  donnees: T[];
  total: number;
  page: number;
  limite: number;
}

export interface Billet {
  id: string;
  reference: string;
  titre: string;
  description: string;
  statut: 'ouvert' | 'en_cours' | 'resolu' | 'ferme';
  priorite: 'basse' | 'moyenne' | 'haute' | 'critique';
  type: 'bug' | 'fonctionnalite' | 'support' | 'question';
  assigneAId: string | null;
  rapporteurId: string;
  projetId: string;
  etiquettes: string[];
  creeLe: string;
  misAJourLe: string;
  resoluLe: string | null;
  dateEcheance: string | null;
  nombreCommentaires: number;
  nombrePiecesJointes: number;
}

export interface FiltresBillet {
  statut?: Billet['statut'];
  priorite?: Billet['priorite'];
  projetId?: string;
  assigneAId?: string;
  recherche?: string;
  page?: number;
  limite?: number;
}

export interface CreerBilletDto {
  titre: string;
  description: string;
  priorite: Billet['priorite'];
  type: Billet['type'];
  projetId: string;
  assigneAId?: string;
  dateEcheance?: string;
}

export interface Utilisateur {
  id: string;
  nomComplet: string;
  email: string;
  avatar: string;
  role: 'admin' | 'agent' | 'client';
  estEnLigne: boolean;
  departement: string;
  billetsAssignes: number;
  creeLe: string;
}

export interface Projet {
  id: string;
  nom: string;
  description: string;
  couleur: string;
  icone: string;
  statut: 'actif' | 'archive';
  nombreMembres: number;
  nombreBilletsOuverts: number;
  proprietaireId: string;
  creeLe: string;
}

export interface Commentaire {
  id: string;
  billetId: string;
  auteurId: string;
  contenu: string;
  estInterne: boolean;
  creeLe: string;
  misAJourLe: string;
}

export interface CreerCommentaireDto {
  billetId: string;
  contenu: string;
  estInterne: boolean;
}

export interface Notification {
  id: string;
  utilisateurId: string;
  type: 'billet_assigne' | 'commentaire_ajoute' | 'statut_modifie' | 'mention';
  titre: string;
  message: string;
  estLue: boolean;
  billetId: string;
  creeLe: string;
}
