import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NbAuthService, NbAuthResult, NbTokenService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'app-custom-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent implements OnInit {
  private authService = inject(NbAuthService);
  private tokenService = inject(NbTokenService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  email = '';
  password = '';
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  bgImageUrl = '/images/images_authentification1.jpg';

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(auth => {
      if (auth) {
        this.redirectByRole();
      }
    });
  }

  login() {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.authService.authenticate('email', { email: this.email, password: this.password }).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        setTimeout(() => this.redirectByRole(), 500);
      } else {
        this.errors = result.getErrors();
      }
    });
  }

  private redirectByRole() {
    this.tokenService.get().subscribe((token) => {
      const jwtToken = token as NbAuthJWTToken;
      if (jwtToken && jwtToken.isValid()) {
        const payload = jwtToken.getPayload();
        const role = payload?.role;
        if (role === 'admin') {
          this.router.navigate(['/dashboard/admin']);
        } else if (role === 'agent') {
          this.router.navigate(['/dashboard/organisateur']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  // Raccourcis de test Mock
  testerRole(role: string) {
    if (role === 'admin') this.email = 'admin@seneticket.sn';
    else if (role === 'agent') this.email = 'agent@seneticket.sn';
    else this.email = 'client@gmail.com';
    this.password = 'password123';
    this.cdr.detectChanges();
  }
}
