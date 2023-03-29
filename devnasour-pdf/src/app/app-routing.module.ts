import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { TemplateEditorLayoutComponent } from './layouts/template-editor-layout/template-editor-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: 'template-editor',
    component: TemplateEditorLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/template-editor/template-editor.module').then(m => m.TemplateEditorModule)
      }
    ]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'shop',
        loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    onSameUrlNavigation: 'reload',
    
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
