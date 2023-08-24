import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from 'src/app/services/auth.service';
import { TranslationService } from 'src/app/services/translation.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '../angular-material.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceStub: Partial<AuthService>;
  let translationServiceStub: Partial<TranslationService>;

  beforeEach(() => {
    authServiceStub = {
      IsUserLogedIn$: of(false),
      logout: jasmine.createSpy()
    };

    translationServiceStub = {
      setLanguage: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule, AngularMaterialModule],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: TranslationService, useValue: translationServiceStub }
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 

  it('should call authService.logout() on logout', () => {
    component.logout();

    expect(authServiceStub.logout).toHaveBeenCalled();
  });

  it('should call translationService.setLanguage() on switchLanguage', () => {
    const lang = 'en';

    component.switchLanguage(lang);

    expect(translationServiceStub.setLanguage).toHaveBeenCalledWith(lang);
  });
});
