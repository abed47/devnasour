import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';
import { TopNavComponent } from 'src/app/layouts/main-layout/components/top-nav/top-nav.component';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import MainLayoutImports from '../../shared/main-module-imports';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, TopNavComponent, MainLayoutComponent, ...MainLayoutImports.declarations],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ...MainLayoutImports.imports
  ],
  bootstrap: [MainLayoutComponent]
})
export class PagesModule { }
