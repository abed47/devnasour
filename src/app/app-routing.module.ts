import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { TemplateEditorLayoutComponent } from './layouts/template-editor-layout/template-editor-layout.component';

const routes: Routes = [
  {
    path: 'template-editor',
    component: TemplateEditorLayoutComponent,
    children: [
      {
        path: '2d',
        loadChildren: () => import('./modules/template-editor/template-editor.module').then(m => m.TemplateEditorModule)
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
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
