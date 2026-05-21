import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

async function prepareApp() {
  if (environment.mock) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

prepareApp()
  .catch(err => console.error('Failed to start MSW:', err))
  .then(() => {
    bootstrapApplication(App, appConfig)
      .catch((err) => console.error(err));
  });
