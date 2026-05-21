import { faker } from '@faker-js/faker/locale/fr';
import { Billet, Utilisateur, Projet, Commentaire, Notification } from '../../app/models';

// Utilisateurs
export function genererUtilisateur(): Utilisateur {
  return {
    id: faker.string.uuid(),
    nomComplet: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(['admin', 'agent', 'client']),
    estEnLigne: faker.datatype.boolean(),
    departement: faker.commerce.department(),
    billetsAssignes: faker.number.int({ min: 0, max: 20 }),
    creeLe: faker.date.past().toISOString(),
  };
}

export function genererListeUtilisateurs(n: number): Utilisateur[] {
  return Array.from({ length: n }, genererUtilisateur);
}

export const utilisateurs = genererListeUtilisateurs(30);
utilisateurs[0] = { ...utilisateurs[0], role: 'admin' };

// Projets
export function genererProjet(proprietaireId: string): Projet {
  return {
    id: faker.string.uuid(),
    nom: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    couleur: faker.color.rgb(),
    icone: faker.helpers.arrayElement(['🔥', '🚀', '💡', '🐛', '📈']),
    statut: faker.helpers.arrayElement(['actif', 'actif', 'archive']),
    nombreMembres: faker.number.int({ min: 1, max: 15 }),
    nombreBilletsOuverts: faker.number.int({ min: 0, max: 50 }),
    proprietaireId,
    creeLe: faker.date.past().toISOString(),
  };
}

export function genererListeProjets(n: number): Projet[] {
  return Array.from({ length: n }, () => genererProjet(faker.helpers.arrayElement(utilisateurs).id));
}

export const projets = genererListeProjets(10);

// Billets
export function genererBillet(): Billet {
  const estResolu = faker.datatype.boolean();
  return {
    id: faker.string.uuid(),
    reference: `TKT-${faker.number.int({ min: 1000, max: 9999 })}`,
    titre: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(2),
    statut: estResolu ? faker.helpers.arrayElement(['resolu', 'ferme']) : faker.helpers.arrayElement(['ouvert', 'en_cours']),
    priorite: faker.helpers.arrayElement(['basse', 'moyenne', 'haute', 'critique']),
    type: faker.helpers.arrayElement(['bug', 'fonctionnalite', 'support', 'question']),
    assigneAId: faker.datatype.boolean() ? faker.helpers.arrayElement(utilisateurs).id : null,
    rapporteurId: faker.helpers.arrayElement(utilisateurs).id,
    projetId: faker.helpers.arrayElement(projets).id,
    etiquettes: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.word.sample()),
    creeLe: faker.date.recent({ days: 30 }).toISOString(),
    misAJourLe: faker.date.recent({ days: 5 }).toISOString(),
    resoluLe: estResolu ? faker.date.recent().toISOString() : null,
    dateEcheance: faker.datatype.boolean() ? faker.date.soon({ days: 10 }).toISOString() : null,
    nombreCommentaires: faker.number.int({ min: 0, max: 10 }),
    nombrePiecesJointes: faker.number.int({ min: 0, max: 3 }),
  };
}

export function genererListeBillets(n: number): Billet[] {
  return Array.from({ length: n }, genererBillet);
}

export const billets = genererListeBillets(100);

// Commentaires
export function genererCommentaire(billetId: string): Commentaire {
  return {
    id: faker.string.uuid(),
    billetId,
    auteurId: faker.helpers.arrayElement(utilisateurs).id,
    contenu: faker.lorem.sentences(2),
    estInterne: faker.datatype.boolean({ probability: 0.2 }),
    creeLe: faker.date.recent({ days: 10 }).toISOString(),
    misAJourLe: faker.date.recent({ days: 2 }).toISOString(),
  };
}

export function genererListeCommentaires(n: number): Commentaire[] {
  const commentairesListe: Commentaire[] = [];
  billets.forEach(billet => {
    const count = faker.number.int({ min: 0, max: 5 });
    for (let i = 0; i < count; i++) {
      commentairesListe.push(genererCommentaire(billet.id));
    }
  });
  return commentairesListe;
}

export const commentaires = genererListeCommentaires(0);

// Notifications
export function genererNotification(utilisateurId: string): Notification {
  return {
    id: faker.string.uuid(),
    utilisateurId,
    type: faker.helpers.arrayElement(['billet_assigne', 'commentaire_ajoute', 'statut_modifie', 'mention']),
    titre: faker.lorem.words(3),
    message: faker.lorem.sentence(),
    estLue: faker.datatype.boolean(),
    billetId: faker.helpers.arrayElement(billets).id,
    creeLe: faker.date.recent({ days: 5 }).toISOString(),
  };
}

export function genererListeNotifications(n: number): Notification[] {
  return Array.from({ length: n }, () => genererNotification(utilisateurs[0].id));
}

export const notifications = genererListeNotifications(20);
