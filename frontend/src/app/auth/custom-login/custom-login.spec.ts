import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLogin } from './custom-login';

describe('CustomLogin', () => {
  let component: CustomLogin;
  let fixture: ComponentFixture<CustomLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
