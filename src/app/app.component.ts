import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isLoading$ = this.loader.isLoading$
constructor(private loader: LoaderService, private cdr: ChangeDetectorRef){}
ngAfterViewInit() {
  this.isLoading$.subscribe(() => 
    this.cdr.detectChanges()
  );
}
}
