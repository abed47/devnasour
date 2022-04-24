import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { RegisterComponent } from 'src/app/pages/auth/register/register.component';
import { ResetPasswordComponent } from 'src/app/pages/auth/reset-password/reset-password.component';
import { ContactUsComponent } from 'src/app/pages/contact-us/contact-us.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { PrivacyPolicyComponent } from 'src/app/pages/privacy-policy/privacy-policy.component';
import { ProjectListingComponent } from 'src/app/pages/projects/project-listing/project-listing.component';
import { ProjectViewComponent } from 'src/app/pages/projects/project-view/project-view.component';
import { TermsOfUseComponent } from 'src/app/pages/terms-of-use/terms-of-use.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectListingComponent
  },
  {
    path: 'project/:id',
    component: ProjectViewComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
