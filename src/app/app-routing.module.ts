import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { TemplateEditorLayoutComponent } from './layouts/template-editor-layout/template-editor-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)
      }
    ]
  },
  {
    path: '2d-editor',
    component: TemplateEditorLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/template-editor/template-editor.module').then(m => m.TemplateEditorModule)
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
