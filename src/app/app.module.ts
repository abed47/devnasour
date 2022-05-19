import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeoService } from './services/seo.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HelperService } from './services/helper.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RequestService } from './services/request.service';
import { LayoutUtilsService } from './services/layout-utils.service';
import { MatMenuModule } from '@angular/material/menu';
import { InterceptorService } from './services/interceptor.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressBarModule,
  ],
  providers: [
    SeoService,
    HelperService,
    RequestService,
    LayoutUtilsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
