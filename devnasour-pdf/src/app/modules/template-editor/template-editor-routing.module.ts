import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateEditorLayoutComponent } from 'src/app/layouts/template-editor-layout/template-editor-layout.component';
import { MockupEditorComponent } from 'src/app/pages/editors/mockup-template-editor/mockup-editor.component';
import { TemplateEditorComponent } from 'src/app/pages/editors/template-editor/template-editor.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateEditorLayoutComponent,
    children: [
      {
        path: '2d',
        component: TemplateEditorComponent
      },
      {
        path: 'mockups',
        component: MockupEditorComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateEditorRoutingModule { }
