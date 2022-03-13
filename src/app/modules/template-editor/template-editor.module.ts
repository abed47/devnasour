import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateEditorRoutingModule } from './template-editor-routing.module';
import { TemplateEditorComponent } from 'src/app/pages/editors/template-editor/template-editor.component';
import { TemplateEditorLayoutComponent } from 'src/app/layouts/template-editor-layout/template-editor-layout.component';


@NgModule({
  declarations: [TemplateEditorComponent, TemplateEditorLayoutComponent],
  imports: [
    CommonModule,
    TemplateEditorRoutingModule
  ],
  bootstrap: [TemplateEditorLayoutComponent]
})
export class TemplateEditorModule { }
