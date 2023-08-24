import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslationService } from './services/translation.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from './services/auth.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoading$ = this.loader.isLoading$
constructor(private loader: LoaderService){}
}
