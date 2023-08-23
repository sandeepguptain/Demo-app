import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslationService } from './services/translation.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-app';
  isDesktopOrTablet!: boolean;
  isLoggedIn = this.authService.IsUserLogedIn$;
  constructor(private authService: AuthService,
    private translationService: TranslationService, private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
    ]).subscribe(result => {
      this.isDesktopOrTablet = !result.matches;
    });
  }
  

  switchLanguage(lang: string): void {
    this.translationService.setLanguage(lang);
  }

  logout() {
    this.authService.logout();
  }
}
