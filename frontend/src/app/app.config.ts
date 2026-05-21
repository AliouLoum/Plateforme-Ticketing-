import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { provideHttpClient } from '@angular/common/http';
import { provideHighcharts } from 'highcharts-angular';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideHighcharts(),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'default' }),
      NbLayoutModule,
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
      NbIconModule,
      NbEvaIconsModule,
      NbAuthModule.forRoot({
        strategies: [
          NbPasswordAuthStrategy.setup({
            name: 'email',
            baseEndpoint: '/api', // L'URL de notre mock MSW
            login: {
              endpoint: '/auth/login',
              method: 'post',
            },
            logout: {
              endpoint: '/auth/logout',
              method: 'delete',
            },
            token: {
              class: NbAuthJWTToken,
              key: 'data.token', // le chemin dans la réponse JSON
            }
          }),
        ],
        forms: {
          login: {
            redirectDelay: 500,
            strategy: 'email',
            rememberMe: true,
            showMessages: {
              success: true,
              error: true,
            },
          },
          logout: {
            redirectDelay: 500,
            strategy: 'email',
          },
        },
      })
    )
  ]
};
