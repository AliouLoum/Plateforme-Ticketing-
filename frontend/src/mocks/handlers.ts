import { http, HttpResponse, delay } from 'msw';
import { faker } from '@faker-js/faker';
import { billets, utilisateurs, projets, commentaires, notifications } from './data/db';
import { Billet, Commentaire } from '../app/models';

export const handlers = [
  // --- AUTHENTICATION NEBULAR ---
  http.post('/api/auth/login', async ({ request }) => {
    await delay(800);
    const body = await request.json() as { email?: string, password?: string };
    
    // On simule une connexion réussie pour n'importe qui
    // Pour simuler différents rôles avec Nebular, on pourrait vérifier l'email.
    // Ex: admin@seneticket.sn -> admin
    
    let role = 'client';
    if (body.email?.includes('admin')) role = 'admin';
    if (body.email?.includes('agent') || body.email?.includes('orga')) role = 'agent';

    // On récupère ou génère un utilisateur avec ce rôle
    let user = utilisateurs.find(u => u.role === role);
    if (!user) user = utilisateurs[0];

    // On génère un faux JWT pour que Nebular puisse le décoder
    const payload = { 
      id: user.id,
      role: user.role, 
      nomComplet: user.nomComplet,
      email: body.email || 'test@seneticket.sn',
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    };
    
    // btoa pour encoder en base64 (façon JWT)
    const base64Payload = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Payload}.mock_signature`;

    return HttpResponse.json({
      data: {
        token: token
      }
    });
  }),

  http.delete('/api/auth/logout', async () => {
    await delay(300);
    return new HttpResponse(null, { status: 200 });
  }),

  // --- BILLETS ---
  http.get('/api/tickets', async ({ request }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const url = new URL(request.url);
    const statut = url.searchParams.get('statut') as any;
    const priorite = url.searchParams.get('priorite') as any;
    const projetId = url.searchParams.get('projetId');
    const assigneAId = url.searchParams.get('assigneAId');
    const recherche = url.searchParams.get('recherche');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limite = parseInt(url.searchParams.get('limite') || '10', 10);

    let filtres = billets;
    if (statut) filtres = filtres.filter(b => b.statut === statut);
    if (priorite) filtres = filtres.filter(b => b.priorite === priorite);
    if (projetId) filtres = filtres.filter(b => b.projetId === projetId);
    if (assigneAId) filtres = filtres.filter(b => b.assigneAId === assigneAId);
    if (recherche) {
      const q = recherche.toLowerCase();
      filtres = filtres.filter(b => b.titre.toLowerCase().includes(q) || b.reference.toLowerCase().includes(q));
    }

    const start = (page - 1) * limite;
    const pagines = filtres.slice(start, start + limite);

    return HttpResponse.json({
      donnees: pagines,
      total: filtres.length,
      page,
      limite
    });
  }),

  http.get('/api/tickets/:id', async ({ params }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const billet = billets.find(b => b.id === params['id']);
    if (!billet) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(billet);
  }),

  http.post('/api/tickets', async ({ request }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const payload = await request.json() as Partial<Billet>;
    const nouveauBillet: Billet = {
      id: faker.string.uuid(),
      reference: `TKT-${faker.number.int({ min: 1000, max: 9999 })}`,
      titre: payload.titre || '',
      description: payload.description || '',
      priorite: payload.priorite || 'moyenne',
      type: payload.type || 'bug',
      projetId: payload.projetId || '',
      assigneAId: payload.assigneAId || null,
      rapporteurId: utilisateurs[0].id,
      statut: 'ouvert',
      etiquettes: [],
      creeLe: new Date().toISOString(),
      misAJourLe: new Date().toISOString(),
      resoluLe: null,
      dateEcheance: payload.dateEcheance || null,
      nombreCommentaires: 0,
      nombrePiecesJointes: 0,
    };
    billets.unshift(nouveauBillet);
    return HttpResponse.json(nouveauBillet, { status: 201 });
  }),

  http.put('/api/tickets/:id', async ({ params, request }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const index = billets.findIndex(b => b.id === params['id']);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    
    const payload = await request.json() as Partial<Billet>;
    billets[index] = { ...billets[index], ...payload, misAJourLe: new Date().toISOString() };
    return HttpResponse.json(billets[index]);
  }),

  http.delete('/api/tickets/:id', async ({ params }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const index = billets.findIndex(b => b.id === params['id']);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    billets.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('/api/tickets/:id/comments', async ({ params }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const billetCommentaires = commentaires.filter(c => c.billetId === params['id']);
    return HttpResponse.json(billetCommentaires);
  }),

  // --- UTILISATEURS ---
  http.get('/api/users', async ({ request }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const url = new URL(request.url);
    const role = url.searchParams.get('role');
    let filtres = utilisateurs;
    if (role) filtres = filtres.filter(u => u.role === role);
    return HttpResponse.json(filtres);
  }),

  http.get('/api/users/me', async () => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    return HttpResponse.json(utilisateurs[0]);
  }),

  http.get('/api/users/:id', async ({ params }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const utilisateur = utilisateurs.find(u => u.id === params['id']);
    if (!utilisateur) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(utilisateur);
  }),

  // --- PROJETS ---
  http.get('/api/projects', async () => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    return HttpResponse.json(projets);
  }),

  http.get('/api/projects/:id', async ({ params }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const projet = projets.find(p => p.id === params['id']);
    if (!projet) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(projet);
  }),

  http.get('/api/projects/:id/tickets', async ({ params, request }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limite = parseInt(url.searchParams.get('limite') || '10', 10);

    const billetsProjet = billets.filter(b => b.projetId === params['id']);
    const start = (page - 1) * limite;
    const pagines = billetsProjet.slice(start, start + limite);

    return HttpResponse.json({
      donnees: pagines,
      total: billetsProjet.length,
      page,
      limite
    });
  }),

  // --- COMMENTAIRES ---
  http.post('/api/comments', async ({ request }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const payload = await request.json() as Partial<Commentaire>;
    const nouveauCommentaire: Commentaire = {
      id: faker.string.uuid(),
      billetId: payload.billetId || '',
      auteurId: utilisateurs[0].id,
      contenu: payload.contenu || '',
      estInterne: payload.estInterne || false,
      creeLe: new Date().toISOString(),
      misAJourLe: new Date().toISOString(),
    };
    commentaires.push(nouveauCommentaire);
    const billet = billets.find(b => b.id === nouveauCommentaire.billetId);
    if (billet) billet.nombreCommentaires++;
    return HttpResponse.json(nouveauCommentaire, { status: 201 });
  }),

  http.put('/api/comments/:id', async ({ params, request }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const index = commentaires.findIndex(c => c.id === params['id']);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    const payload = await request.json() as Partial<Commentaire>;
    commentaires[index] = { ...commentaires[index], contenu: payload.contenu || commentaires[index].contenu, misAJourLe: new Date().toISOString() };
    return HttpResponse.json(commentaires[index]);
  }),

  http.delete('/api/comments/:id', async ({ params }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const index = commentaires.findIndex(c => c.id === params['id']);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    const billetId = commentaires[index].billetId;
    commentaires.splice(index, 1);
    const billet = billets.find(b => b.id === billetId);
    if (billet) billet.nombreCommentaires--;
    return new HttpResponse(null, { status: 204 });
  }),

  // --- NOTIFICATIONS ---
  http.get('/api/notifications', async () => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const userNotifications = notifications.filter(n => n.utilisateurId === utilisateurs[0].id);
    return HttpResponse.json(userNotifications);
  }),

  http.put('/api/notifications/:id/read', async ({ params }) => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    const notif = notifications.find(n => n.id === params['id']);
    if (!notif) return new HttpResponse(null, { status: 404 });
    notif.estLue = true;
    return new HttpResponse(null, { status: 204 });
  }),

  http.put('/api/notifications/read-all', async () => {
    await delay(faker.number.int({ min: 200, max: 500 }));
    notifications.forEach(n => {
      if (n.utilisateurId === utilisateurs[0].id) n.estLue = true;
    });
    return new HttpResponse(null, { status: 204 });
  }),
];
