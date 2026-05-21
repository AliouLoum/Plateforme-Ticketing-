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
  selector: 'app-dashboard-organisateur',
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
  templateUrl: './dashboard-organisateur.component.html',
  styleUrls: ['./dashboard-organisateur.component.scss']
})
export class DashboardOrganisateurComponent implements OnInit, OnDestroy {
  activeSection = 'overview';
  private menuSub!: Subscription;
  today = new Date();
  sidebarCompact = false;
  Highcharts: typeof Highcharts = Highcharts;

  menuItems: NbMenuItem[] = [
    { title: 'Tableau de bord', icon: 'grid-outline', data: 'overview' },
    { title: 'Mes Événements', icon: 'calendar-outline', data: 'events' },
    { title: 'Ventes & Billets', icon: 'credit-card-outline', data: 'sales' },
    { title: 'Agents Scanners', icon: 'smartphone-outline', data: 'scanners' },
    { title: 'Paramètres', icon: 'settings-2-outline', data: 'settings' }
  ];

  // --- OVERVIEW DATA ---
  kpis = [
    { label: 'Billets Vendus', value: '1 247', trend: '+15%', trendUp: true, icon: 'ticket-outline' },
    { label: 'Revenus (CFA)', value: '6.2M', trend: '+8%', trendUp: true, icon: 'bar-chart-2-outline' },
    { label: 'Taux Remplissage', value: '68%', trend: '+5%', trendUp: true, icon: 'people-outline' },
    { label: 'Vues Profil', value: '14.2k', trend: '-2%', trendUp: false, icon: 'eye-outline' }
  ];

  quickStats = {
    ventesAuj: 124,
    revenuAuj: '1 850 000',
    tauxConversion: 12.4,
    visiteursActifs: 342,
    scansLive: 45
  };

  recentActivity = [
    { type: 'payment', message: 'Paiement de 15 000 CFA reçu — Wave', time: 'Il y a 5 min' },
    { type: 'event', message: 'Festival de Dakar a atteint 50% de remplissage', time: 'Il y a 2h' },
    { type: 'user', message: '10 nouveaux billets achetés (Ousmane D.)', time: 'Il y a 3h' },
    { type: 'alert', message: 'Attention : rupture de stock imminente (Pass VIP)', time: 'Hier' }
  ];

  systemAlerts = [
    { niveau: 'success', titre: 'Paiement reçu', message: 'Virement de 2.5M CFA effectué vers votre compte.', temps: 'Il y a 1h', lu: true, icon: 'checkmark-circle-outline' },
    { niveau: 'warning', titre: 'Stock bas', message: 'Il ne reste que 12 billets VIP pour le Festival de Dakar.', temps: 'Il y a 3h', lu: false, icon: 'alert-triangle-outline' },
    { niveau: 'info', titre: 'Nouvel événement approuvé', message: 'Tech Africa Summit est maintenant public.', temps: 'Hier', lu: false, icon: 'star-outline' },
  ];

  // --- CHARTS ---
  revenueChartOptions: Highcharts.Options = {
    chart: { type: 'column', backgroundColor: 'transparent', height: 280, style: { fontFamily: 'Inter, sans-serif' } },
    title: { text: '' },
    credits: { enabled: false },
    xAxis: { categories: ['Jeu', 'Ven', 'Sam', 'Dim', 'Lun', 'Mar', 'Auj'], gridLineWidth: 0, lineWidth: 0, tickWidth: 0, labels: { style: { color: '#7e775f', fontWeight: '500' } } },
    yAxis: { title: { text: '' }, gridLineColor: '#f6edda', gridLineDashStyle: 'Dash', labels: { style: { color: '#7e775f' }, formatter: function() { return (Number(this.value) / 1000) + 'k'; } } },
    plotOptions: { column: { borderRadius: 4, pointPadding: 0.2, groupPadding: 0.1, borderWidth: 0 } },
    series: [{ type: 'column', name: 'Revenus', data: [450000, 600000, 1200000, 1500000, 800000, 400000, 1850000], color: '#FFD700' }],
    legend: { enabled: false }
  };

  salesChartOptions: Highcharts.Options = {
    chart: { type: 'spline', backgroundColor: 'transparent', height: 220, style: { fontFamily: 'Inter, sans-serif' } },
    title: { text: '' },
    credits: { enabled: false },
    xAxis: { categories: ['S1', 'S2', 'S3', 'S4'], gridLineWidth: 0, lineWidth: 0, tickWidth: 0, labels: { style: { color: '#7e775f', fontSize: '10px' } } },
    yAxis: { title: { text: '' }, gridLineWidth: 1, gridLineColor: '#f6edda', labels: { style: { color: '#7e775f', fontSize: '10px' } } },
    series: [{ type: 'spline', name: 'Billets', data: [120, 250, 480, 842], color: '#006a6a', lineWidth: 3, marker: { enabled: false } }],
    legend: { enabled: false }
  };

  // --- AG GRID CONFIG ---
  defaultGridOptions: GridOptions = {
    rowHeight: 48,
    headerHeight: 40,
    pagination: true,
    paginationPageSize: 10,
    suppressCellFocus: true,
    domLayout: 'autoHeight'
  };

  // Events Table
  eventsColDefs: ColDef[] = [
    { headerName: 'Événement', field: 'titre', flex: 2, cellStyle: { fontWeight: '600' } },
    { headerName: 'Date', field: 'date', flex: 1 },
    { headerName: 'Lieu', field: 'lieu', flex: 1.5 },
    { headerName: 'Vendus', field: 'vendus', flex: 1 },
    { headerName: 'Revenu', field: 'revenu', flex: 1 },
    { headerName: 'Statut', field: 'statut', flex: 1, cellRenderer: (p: any) => {
      const cls = p.value === 'Publié' ? 'ag-tag-active' : p.value === 'Brouillon' ? 'ag-tag-draft' : 'ag-tag-pending';
      return `<span class="ag-tag ${cls}">${p.value}</span>`;
    }}
  ];
  eventsRowData = [
    { titre: 'Festival de Dakar 2025', date: '15 Déc 2025', lieu: 'Grand Théâtre', vendus: '842/1200', revenu: '4.2M CFA', statut: 'Publié' },
    { titre: 'Tech Africa Summit', date: '20 Nov 2025', lieu: 'CICES', vendus: '0/500', revenu: '0 CFA', statut: 'En attente' },
    { titre: 'Match SEN vs CIV', date: '08 Jan 2026', lieu: 'Stade Abdoulaye Wade', vendus: '0/5000', revenu: '0 CFA', statut: 'Brouillon' }
  ];

  // Sales Table
  salesColDefs: ColDef[] = [
    { headerName: 'Référence', field: 'ref', flex: 1, cellRenderer: (p: any) => `<span class="ag-code">${p.value}</span>` },
    { headerName: 'Client', field: 'client', flex: 1.5, cellStyle: { fontWeight: '600' } },
    { headerName: 'Billet', field: 'billet', flex: 1.5 },
    { headerName: 'Montant', field: 'montant', flex: 1 },
    { headerName: 'Moyen', field: 'moyen', flex: 1, cellRenderer: (p: any) => `<span class="ag-tag">${p.value}</span>` },
    { headerName: 'Date', field: 'date', flex: 1 },
  ];
  salesRowData = [
    { ref: 'TXN-001247', client: 'Ousmane Diallo', billet: 'VIP', montant: '15 000 CFA', moyen: 'Wave', date: 'Il y a 2 min' },
    { ref: 'TXN-001246', client: 'Fatou Sow', billet: 'Standard', montant: '5 000 CFA', moyen: 'Orange Money', date: 'Il y a 15 min' },
    { ref: 'TXN-001245', client: 'Moussa Ba', billet: 'VIP', montant: '15 000 CFA', moyen: 'Wave', date: 'Il y a 1h' },
    { ref: 'TXN-001244', client: 'Aminata Ndiaye', billet: 'Standard', montant: '5 000 CFA', moyen: 'Carte bancaire', date: 'Il y a 2h' }
  ];

  // Scanners Table
  scannersColDefs: ColDef[] = [
    { headerName: 'Agent', field: 'nom', flex: 1.5, cellStyle: { fontWeight: '600' } },
    { headerName: 'Événement Assigné', field: 'event', flex: 2 },
    { headerName: 'Scans', field: 'scans', flex: 1 },
    { headerName: 'Statut', field: 'statut', flex: 1, cellRenderer: (p: any) => {
      const cls = p.value === 'En ligne' ? 'ag-tag-active' : 'ag-tag-pending';
      return `<span class="ag-tag ${cls}">${p.value}</span>`;
    }}
  ];
  scannersRowData = [
    { nom: 'Scanner 1 (Porte A)', event: 'Festival de Dakar 2025', scans: '142', statut: 'En ligne' },
    { nom: 'Scanner 2 (Porte B)', event: 'Festival de Dakar 2025', scans: '89', statut: 'En ligne' },
    { nom: 'Scanner 3 (VIP)', event: 'Festival de Dakar 2025', scans: '0', statut: 'Hors ligne' }
  ];

  // Settings
  settings = {
    nomOrganisation: 'Dakar Events Pro',
    emailContact: 'agent@seneticket.sn',
    telephone: '+221 77 123 45 67',
    notificationsEmail: true,
    notificationsSMS: false
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuSub = this.menuService.onItemClick().subscribe((event) => {
      if (event.item.data) {
        this.activeSection = event.item.data;
      }
    });
  }

  ngOnDestroy() { this.menuSub?.unsubscribe(); }
  toggleSidebar() { this.sidebarService.toggle(false, 'agent-sidebar'); }
  logout() { this.authService.logout('email').subscribe(() => this.router.navigate(['/auth/login'])); }
}
