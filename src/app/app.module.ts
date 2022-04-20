import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeoService } from './services/seo.service';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HelperService } from './services/helper.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RequestService } from './services/request.service';
import { LayoutUtilsService } from './services/layout-utils.service';

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
    MatSnackBarModule
  ],
  providers: [
    SeoService,
    HelperService,
    RequestService,
    LayoutUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
