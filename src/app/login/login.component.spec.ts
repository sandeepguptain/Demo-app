import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStub: Partial<AuthService>;
  let routerStub: Partial<Router>;

  beforeEach(() => {
    authServiceStub = {
      login: (username: string, password: string) => true,
      isAdmin: () => true 
    };

    routerStub = {
      navigate: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports:[RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule , AngularMaterialModule, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
        provideAnimations()

      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to admin if login is successful and user is admin', () => {
    const username = 'admin';
    const password = 'password';

    component.username = username;
    component.password = password;

    fixture.detectChanges();
    component.login();

    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should navigate to user if login is successful and user is not admin', () => {
    authServiceStub.isAdmin = () => false; 
    const username = 'user';
    const password = 'password';

    component.username = username;
    component.password = password;

    fixture.detectChanges();
    component.login();

    expect(routerStub.navigate).toHaveBeenCalledWith(['/user']);
  });

  it('should set loginError to true if login is unsuccessful', () => {
    authServiceStub.login = () => false;
    const username = 'invalid';
    const password = 'invalid';

    component.username = username;
    component.password = password;

    fixture.detectChanges();
    component.login();

    expect(component.loginError).toBe(true);
  });
});
