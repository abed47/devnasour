import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';
import { TopNavComponent } from 'src/app/layouts/main-layout/components/top-nav/top-nav.component';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import MainLayoutImports from '../../shared/main-module-imports';
import { ProjectListingComponent } from '../../pages/projects/project-listing/project-listing.component';
import { ProjectViewComponent } from '../../pages/projects/project-view/project-view.component';
import { AboutComponent } from '../../pages/about/about.component';
import { CartComponent } from 'src/app/pages/cart/cart.component';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { BecomeAPartnerComponent } from '../../pages/become-a-partner/become-a-partner.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';
import { NgxFlickingModule } from '@egjs/ngx-flicking';
import { FavoritesComponent } from 'src/app/pages/favorites/favorites.component';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    TopNavComponent, 
    MainLayoutComponent, 
    ...MainLayoutImports.declarations, 
    ProjectListingComponent, 
    ProjectViewComponent, 
    AboutComponent,
    CartComponent,
    BecomeAPartnerComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ...MainLayoutImports.imports,
    NgxMatIntlTelInputModule,
    MatPaginatorModule,
    MatBadgeModule,
    NgxFlickingModule
  ],
  bootstrap: [MainLayoutComponent]
})
export class PagesModule { }
