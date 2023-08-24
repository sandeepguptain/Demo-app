import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = this.authService.IsUserLogedIn$;
  constructor(private authService: AuthService,
    private translationService: TranslationService,
  ) {}


  switchLanguage(lang: string): void {
    this.translationService.setLanguage(lang);
  }

  logout() {
    this.authService.logout();
  }
}
