import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateEditorComponent } from 'src/app/pages/editors/template-editor/template-editor.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateEditorRoutingModule { }
