import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  NbLayoutModule, NbSidebarModule, NbSidebarService,
  NbCardModule, NbMenuModule, NbMenuService, NbMenuItem,
  NbIconModule, NbUserModule, NbBadgeModule,
  NbButtonModule, NbActionsModule, NbListModule,
  NbProgressBarModule, NbTagModule, NbAlertModule,
  NbInputModule, NbSelectModule, NbToggleModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { AgGridModule } from 'ag-grid-angular';
import type { ColDef, GridOptions } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, HighchartsChartComponent,
    NbLayoutModule, NbSidebarModule, NbCardModule,
    NbMenuModule, NbIconModule, NbUserModule,
    NbBadgeModule, NbButtonModule, NbActionsModule,
    NbListModule, NbProgressBarModule, NbTagModule,
    NbAlertModule, NbEvaIconsModule, NbInputModule,
    NbSelectModule, NbToggleModule, AgGridModule
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  activeSection = 'overview';
  private menuSub!: Subscription;
  today = new Date();
  sidebarCompact = false;
  Highcharts: typeof Highcharts = Highcharts;

  menuItems: NbMenuItem[] = [
    { title: 'Tableau de bord', icon: 'grid-outline', data: 'overview' },
    { title: 'Alertes', icon: 'bell-outline', data: 'alerts', badge: { text: '4', status: 'danger' } },
    { title: 'Utilisateurs', icon: 'people-outline', data: 'users' },
    { title: 'Organisateurs', icon: 'person-done-outline', data: 'organisateurs', badge: { text: '3', status: 'warning' } },
    { title: 'Événements', icon: 'calendar-outline', data: 'events' },
    { title: 'Catégories & Lieux', icon: 'pin-outline', data: 'categories' },
    { title: 'Transactions', icon: 'credit-card-outline', data: 'transactions' },
    { title: 'Sessions & Logs', icon: 'shield-outline', data: 'sessions' },
    { title: 'Paramètres', icon: 'settings-2-outline', data: 'settings' },
  ];

  // --- KPI ---
  kpis = [
    { label: 'Utilisateurs Inscrits', value: '14 832', trend: '+234', trendUp: true, icon: 'people-outline', sparkline: [320,450,520,680,790,920,1100,1250,1380,1520,1680,1830] },
    { label: 'Organisateurs Actifs', value: '87', trend: '+5', trendUp: true, icon: 'person-done-outline', sparkline: [12,18,22,30,38,45,52,60,68,72,80,87] },
    { label: 'Revenus Totaux', value: '24 500 000 CFA', trend: '+12%', trendUp: true, icon: 'credit-card-outline', sparkline: [1.2,1.8,2.1,1.9,2.5,3.2,2.8,3.5,4.1,3.8,4.5,5.2] },
    { label: 'Événements Publiés', value: '642', trend: '+18', trendUp: true, icon: 'calendar-outline', sparkline: [35,42,55,60,72,85,95,110,120,135,150,170] },
  ];

  // --- Activité récente ---
  recentActivity = [
    { type: 'user', message: 'Mariama Diallo s\'est inscrite', time: 'Il y a 3 min', icon: 'person-add-outline' },
    { type: 'event', message: 'Soirée Jazz au Terrou-Bi soumis pour validation', time: 'Il y a 15 min', icon: 'calendar-outline' },
    { type: 'payment', message: 'Paiement de 15 000 CFA reçu — Wave', time: 'Il y a 30 min', icon: 'credit-card-outline' },
    { type: 'org', message: 'Fatou Events SN demande approbation', time: 'Il y a 1h', icon: 'person-done-outline' },
    { type: 'alert', message: '5 tentatives de connexion échouées', time: 'Il y a 2h', icon: 'alert-triangle-outline' },
    { type: 'payment', message: 'Paiement de 30 000 CFA remboursé', time: 'Il y a 3h', icon: 'credit-card-outline' },
  ];

  // --- Approbations en attente ---
  pendingApprovals = [
    { type: 'Événement', nom: 'Soirée Jazz au Terrou-Bi', from: 'Aliou Productions', time: 'Il y a 2h' },
    { type: 'Organisateur', nom: 'Fatou Events SN', from: 'fatouevents@gmail.com', time: 'Il y a 5h' },
    { type: 'Événement', nom: 'Festival Cinéma Africain', from: 'CineAfrique', time: 'Il y a 1 jour' },
  ];

  // --- Performance rapide ---
  quickStats = {
    ticketsVendusAuj: 124,
    revenuAuj: '1 850 000',
    tauxConversion: 68,
    tempsReponseMoy: '1.2s',
    uptimeServeur: 99.8,
    visiteursActifs: 342
  };

  // --- AG Grid Defaults ---
  defaultGridOptions: GridOptions = {
    headerHeight: 44,
    rowHeight: 54,
    animateRows: true,
    pagination: true,
    paginationPageSize: 10,
    domLayout: 'autoHeight',
    suppressCellFocus: true
  };

  // --- Users ---
  usersColDefs: ColDef[] = [
    { headerName: 'Nom', field: 'nom', flex: 1.5, minWidth: 150, cellStyle: { fontWeight: '700' } },
    { headerName: 'Email', field: 'email', flex: 2, minWidth: 180 },
    { headerName: 'Rôle', field: 'role', flex: 1, minWidth: 100, cellRenderer: (p: any) => `<span class="ag-tag ${p.value === 'Organisateur' ? 'ag-tag-teal' : ''}">${p.value}</span>` },
    { headerName: 'Inscrit le', field: 'inscrit', flex: 1.2, minWidth: 120 },
    { headerName: 'Dernier accès', field: 'dernierAcces', flex: 1.2, minWidth: 120 },
    { headerName: 'Statut', field: 'statut', flex: 1, minWidth: 100, cellRenderer: (p: any) => {
      const cls = p.value === 'Actif' ? 'ag-tag-active' : p.value === 'Suspendu' ? 'ag-tag-error' : 'ag-tag-pending';
      return `<span class="ag-tag ${cls}">${p.value}</span>`;
    }},
  ];
  usersRowData = [
    { nom: 'Mariama Diallo', email: 'mariama@gmail.com', role: 'Client', inscrit: '12 Mai 2026', statut: 'Actif', dernierAcces: 'Il y a 10 min' },
    { nom: 'Ibrahima Ndiaye', email: 'ibrahima@events.sn', role: 'Organisateur', inscrit: '10 Mai 2026', statut: 'En attente', dernierAcces: 'Il y a 1h' },
    { nom: 'Fatou Ba', email: 'fatou.ba@gmail.com', role: 'Client', inscrit: '8 Mai 2026', statut: 'Actif', dernierAcces: 'Il y a 3h' },
    { nom: 'Moussa Sow', email: 'moussa.events@gmail.com', role: 'Organisateur', inscrit: '5 Mai 2026', statut: 'Actif', dernierAcces: 'Il y a 5h' },
    { nom: 'Aissatou Mbaye', email: 'aissatou@dakar.com', role: 'Client', inscrit: '1 Mai 2026', statut: 'Suspendu', dernierAcces: 'Il y a 3 jours' },
    { nom: 'Ousmane Fall', email: 'ousmane@test.com', role: 'Client', inscrit: '28 Avr 2026', statut: 'Actif', dernierAcces: 'Hier' },
    { nom: 'Awa Diop', email: 'awa.diop@gmail.com', role: 'Client', inscrit: '25 Avr 2026', statut: 'Actif', dernierAcces: 'Il y a 2 jours' },
  ];

  // --- Organisateurs ---
  orgColDefs: ColDef[] = [
    { headerName: 'Organisateur', field: 'nom', flex: 1.5, cellStyle: { fontWeight: '700' } },
    { headerName: 'Email', field: 'email', flex: 2 },
    { headerName: 'Événements', field: 'events', flex: 0.8, cellStyle: { fontWeight: '700', textAlign: 'center' } },
    { headerName: 'Revenus', field: 'revenus', flex: 1.2, cellStyle: { fontWeight: '800' } },
    { headerName: 'Inscription', field: 'dateInscription', flex: 1.2 },
    { headerName: 'Statut', field: 'statut', flex: 1, cellRenderer: (p: any) => `<span class="ag-tag ${p.value === 'Vérifié' ? 'ag-tag-active' : 'ag-tag-pending'}">${p.value}</span>` },
  ];
  orgRowData = [
    { nom: 'Aliou Productions', email: 'aliou@prod.sn', events: 12, revenus: '4 200 000 CFA', statut: 'Vérifié', dateInscription: '15 Jan 2026' },
    { nom: 'Dakar Events Pro', email: 'contact@dakarevents.sn', events: 8, revenus: '2 800 000 CFA', statut: 'Vérifié', dateInscription: '20 Fév 2026' },
    { nom: 'Fatou Events SN', email: 'fatouevents@gmail.com', events: 0, revenus: '0 CFA', statut: 'En attente', dateInscription: '12 Mai 2026' },
    { nom: 'CineAfrique', email: 'cineafrique@gmail.com', events: 0, revenus: '0 CFA', statut: 'En attente', dateInscription: '11 Mai 2026' },
    { nom: 'Teranga Shows', email: 'info@terangashows.sn', events: 0, revenus: '0 CFA', statut: 'En attente', dateInscription: '10 Mai 2026' },
  ];

  // --- Events ---
  eventsColDefs: ColDef[] = [
    { headerName: 'Événement', field: 'titre', flex: 2, cellStyle: { fontWeight: '700' } },
    { headerName: 'Organisateur', field: 'organisateur', flex: 1.3 },
    { headerName: 'Date', field: 'date', flex: 1 },
    { headerName: 'Lieu', field: 'lieu', flex: 1.2 },
    { headerName: 'Billets', field: 'billets', flex: 0.8, valueGetter: (p: any) => `${p.data.billets}/${p.data.total}`, cellStyle: { fontWeight: '700' } },
    { headerName: 'Statut', field: 'statut', flex: 1, cellRenderer: (p: any) => {
      const cls = p.value === 'Publié' ? 'ag-tag-active' : p.value === 'En attente' ? 'ag-tag-pending' : 'ag-tag-draft';
      return `<span class="ag-tag ${cls}">${p.value}</span>`;
    }},
  ];
  eventsRowData = [
    { titre: 'Festival de Dakar 2025', organisateur: 'Aliou Productions', date: '15 Déc 2025', lieu: 'Grand Théâtre', statut: 'Publié', billets: 842, total: 1200 },
    { titre: 'Tech Africa Summit', organisateur: 'Dakar Events Pro', date: '20 Nov 2025', lieu: 'CICES', statut: 'En attente', billets: 0, total: 500 },
    { titre: 'Match Sénégal vs CIV', organisateur: 'Aliou Productions', date: '08 Jan 2026', lieu: 'Stade A. Wade', statut: 'Brouillon', billets: 0, total: 5000 },
    { titre: 'Soirée Jazz Terrou-Bi', organisateur: 'CineAfrique', date: '25 Mai 2026', lieu: 'Terrou-Bi', statut: 'En attente', billets: 0, total: 300 },
    { titre: 'Festival Cinéma Africain', organisateur: 'CineAfrique', date: '1 Jun 2026', lieu: 'Canal Olympia', statut: 'En attente', billets: 0, total: 400 },
  ];

  // --- Transactions ---
  txColDefs: ColDef[] = [
    { headerName: 'Référence', field: 'ref', flex: 1.2, cellRenderer: (p: any) => `<code class="ag-code">${p.value}</code>` },
    { headerName: 'Acheteur', field: 'acheteur', flex: 1.3 },
    { headerName: 'Événement', field: 'event', flex: 1.5 },
    { headerName: 'Montant', field: 'montant', flex: 1.2, cellStyle: { fontWeight: '800' } },
    { headerName: 'Moyen', field: 'moyen', flex: 1, cellRenderer: (p: any) => `<span class="ag-tag">${p.value}</span>` },
    { headerName: 'Date', field: 'date', flex: 1.5 },
    { headerName: 'Statut', field: 'statut', flex: 1, cellRenderer: (p: any) => {
      const cls = p.value === 'Réussi' ? 'ag-tag-active' : p.value === 'Échoué' ? 'ag-tag-error' : 'ag-tag-refund';
      return `<span class="ag-tag ${cls}">${p.value}</span>`;
    }},
  ];
  txRowData = [
    { ref: 'TXN-001247', acheteur: 'Ousmane Diallo', event: 'Festival de Dakar', montant: '15 000 CFA', moyen: 'Wave', date: '13 Mai 23:45', statut: 'Réussi' },
    { ref: 'TXN-001246', acheteur: 'Fatou Sow', event: 'Festival de Dakar', montant: '5 000 CFA', moyen: 'Orange Money', date: '13 Mai 23:30', statut: 'Réussi' },
    { ref: 'TXN-001245', acheteur: 'Moussa Ba', event: 'Festival de Dakar', montant: '15 000 CFA', moyen: 'Wave', date: '13 Mai 22:15', statut: 'Réussi' },
    { ref: 'TXN-001244', acheteur: 'Aminata Ndiaye', event: 'Tech Africa Summit', montant: '10 000 CFA', moyen: 'Carte bancaire', date: '13 Mai 21:00', statut: 'Échoué' },
    { ref: 'TXN-001243', acheteur: 'Ibrahima Fall', event: 'Festival de Dakar', montant: '5 000 CFA', moyen: 'Free Money', date: '13 Mai 20:30', statut: 'Réussi' },
    { ref: 'TXN-001242', acheteur: 'Khady Mboup', event: 'Festival de Dakar', montant: '30 000 CFA', moyen: 'Wave', date: '13 Mai 19:45', statut: 'Remboursé' },
  ];

  // --- Sessions ---
  sessionsColDefs: ColDef[] = [
    { headerName: 'Utilisateur', field: 'user', flex: 1.5 },
    { headerName: 'IP', field: 'ip', flex: 1, cellRenderer: (p: any) => `<code class="ag-code">${p.value}</code>` },
    { headerName: 'Navigateur', field: 'navigateur', flex: 1 },
    { headerName: 'Début', field: 'debut', flex: 1 },
    { headerName: 'Statut', field: 'statut', flex: 0.8, cellRenderer: (p: any) => `<span class="ag-tag ${p.value === 'Active' ? 'ag-tag-active' : 'ag-tag-draft'}">${p.value}</span>` },
  ];
  sessionsRowData = [
    { user: 'admin@seneticket.sn', ip: '196.1.XX.XX', navigateur: 'Chrome 125', debut: 'Il y a 30 min', statut: 'Active' },
    { user: 'aliou@prod.sn', ip: '41.82.XX.XX', navigateur: 'Firefox 128', debut: 'Il y a 1h', statut: 'Active' },
    { user: 'mariama@gmail.com', ip: '105.67.XX.XX', navigateur: 'Safari 18', debut: 'Il y a 2h', statut: 'Active' },
    { user: 'fatou.ba@gmail.com', ip: '196.207.XX.XX', navigateur: 'Chrome 125', debut: 'Il y a 4h', statut: 'Expirée' },
  ];

  activityLogs = [
    { action: 'Connexion admin', user: 'admin@seneticket.sn', detail: 'Connexion réussie', temps: 'Il y a 30 min' },
    { action: 'Événement modifié', user: 'aliou@prod.sn', detail: 'Festival de Dakar — date MAJ', temps: 'Il y a 1h' },
    { action: 'Utilisateur suspendu', user: 'admin@seneticket.sn', detail: 'Aissatou Mbaye — fraude', temps: 'Il y a 3h' },
    { action: 'Transaction remboursée', user: 'admin@seneticket.sn', detail: 'TXN-001242 — 30 000 CFA', temps: 'Il y a 5h' },
    { action: 'Nouvel organisateur', user: 'fatouevents@gmail.com', detail: 'Inscription — en attente', temps: 'Hier' },
  ];

  // --- Alerts ---
  systemAlerts = [
    { niveau: 'warning', titre: 'Organisateurs en attente', message: '3 organisateurs sont en attente de validation depuis plus de 24h.', temps: 'Maintenant', lu: false, icon: 'people-outline' },
    { niveau: 'info', titre: 'Pic de trafic', message: '2 300 visiteurs simultanés détectés.', temps: 'Il y a 20 min', lu: false, icon: 'trending-up-outline' },
    { niveau: 'success', titre: 'Sauvegarde BDD', message: 'Sauvegarde automatique réussie.', temps: 'Il y a 1h', lu: true, icon: 'save-outline' },
    { niveau: 'danger', titre: 'Connexion suspecte', message: 'Tentative échouée depuis l\'IP 41.82.X.X (5 tentatives).', temps: 'Il y a 2h', lu: false, icon: 'shield-off-outline' },
  ];

  // --- Categories / Lieux ---
  categories = [
    { nom: 'Musique', events: 245, icon: 'music-outline' },
    { nom: 'Sport', events: 132, icon: 'activity-outline' },
    { nom: 'Conférences', events: 98, icon: 'briefcase-outline' },
    { nom: 'Festivals', events: 76, icon: 'star-outline' },
    { nom: 'Théâtre', events: 54, icon: 'film-outline' },
    { nom: 'Autres', events: 37, icon: 'more-horizontal-outline' },
  ];
  lieux = [
    { nom: 'Grand Théâtre National', ville: 'Dakar', capacite: '1 800', events: 45 },
    { nom: 'Stade Abdoulaye Wade', ville: 'Diamniadio', capacite: '50 000', events: 12 },
    { nom: 'CICES', ville: 'Dakar', capacite: '5 000', events: 28 },
    { nom: 'Canal Olympia Téranga', ville: 'Dakar', capacite: '300', events: 34 },
    { nom: 'Place du Souvenir', ville: 'Dakar', capacite: '10 000', events: 8 },
  ];

  // --- Settings ---
  settings = { nomPlateforme: 'SeneTicket', emailContact: 'contact@seneticket.sn', commission: 5, maintenanceMode: false, inscriptionsOuvertes: true, validationAuto: false };

  // ===== HIGHCHARTS =====
  revenueChartOptions: Highcharts.Options = {
    chart: { type: 'column', backgroundColor: 'transparent', height: 300, style: { fontFamily: 'Inter, sans-serif' } },
    title: { text: '' },
    credits: { enabled: false },
    xAxis: { categories: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'], labels: { style: { color: '#4d4732', fontSize: '11px', fontWeight: '500' } }, lineColor: '#d0c6ab', tickColor: '#d0c6ab' },
    yAxis: { title: { text: 'Millions CFA', style: { color: '#7e775f', fontWeight: '600', fontSize: '11px' } }, labels: { style: { color: '#7e775f', fontSize: '11px' }, format: '{value}M' }, gridLineColor: '#eae2cf' },
    tooltip: { backgroundColor: '#1f1b10', borderWidth: 0, borderRadius: 12, style: { color: '#fff9ef', fontWeight: '600' }, pointFormat: '<b>{point.y}M CFA</b>' },
    plotOptions: { column: { borderRadius: 6, borderWidth: 0, color: '#FFD700', states: { hover: { color: '#e9c400' } } } },
    series: [{ type: 'column', name: 'Revenus', showInLegend: false, data: [1.2,1.8,2.1,1.9,2.5,3.2,2.8,3.5,4.1,3.8,4.5,5.2] }]
  };

  usersChartOptions: Highcharts.Options = {
    chart: { type: 'areaspline', backgroundColor: 'transparent', height: 220, style: { fontFamily: 'Inter, sans-serif' } },
    title: { text: '' },
    credits: { enabled: false },
    xAxis: { categories: ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'], labels: { style: { color: '#4d4732', fontSize: '10px' } }, lineColor: '#d0c6ab' },
    yAxis: { title: { text: '' }, labels: { style: { color: '#7e775f', fontSize: '10px' } }, gridLineColor: '#eae2cf' },
    tooltip: { backgroundColor: '#1f1b10', borderWidth: 0, borderRadius: 12, style: { color: '#fff9ef', fontWeight: '600' } },
    plotOptions: { areaspline: {
      fillColor: { linearGradient: { x1:0,y1:0,x2:0,y2:1 }, stops: [[0,'rgba(0,106,106,0.25)'],[1,'rgba(0,106,106,0)']] },
      lineColor: '#006a6a', lineWidth: 2.5, marker: { enabled: false, fillColor: '#006a6a' }
    }},
    series: [{ type: 'areaspline', name: 'Inscriptions', showInLegend: false, data: [320,450,520,680,790,920,1100,1250,1380,1520,1680,1830] }]
  };

  categoryChartOptions: Highcharts.Options = {
    chart: { type: 'pie', backgroundColor: 'transparent', height: 240, style: { fontFamily: 'Inter, sans-serif' } },
    title: { text: '' },
    credits: { enabled: false },
    tooltip: { pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>', backgroundColor: '#1f1b10', borderWidth: 0, borderRadius: 12, style: { color: '#fff9ef', fontWeight: '600' } },
    plotOptions: { pie: {
      innerSize: '55%', borderWidth: 3, borderColor: '#fff9ef',
      dataLabels: { enabled: true, format: '{point.name}', style: { fontSize: '10px', fontWeight: '600', color: '#4d4732', textOutline: 'none' }, distance: 15 },
      colors: ['#FFD700','#006a6a','#705d00','#00696f','#e9c400','#d0c6ab']
    }},
    series: [{ type: 'pie', name: 'Catégories', data: [
      {name:'Musique',y:35},{name:'Sport',y:22},{name:'Conférences',y:18},{name:'Festivals',y:12},{name:'Théâtre',y:8},{name:'Autres',y:5}
    ]}]
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: NbAuthService,
    private router: Router,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService
  ) {}

  ngOnInit() {
    this.menuItems[0].selected = true;
    this.menuSub = this.menuService.onItemClick().subscribe(({ item }) => {
      if (item.data) this.activeSection = item.data;
    });
  }

  ngOnDestroy() { this.menuSub?.unsubscribe(); }
  toggleSidebar() { this.sidebarService.toggle(false, 'admin-sidebar'); }
  logout() { this.authService.logout('email').subscribe(() => this.router.navigate(['/auth/login'])); }
}
