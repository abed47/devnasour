import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateEditorRoutingModule } from './template-editor-routing.module';
import { TemplateEditorComponent } from 'src/app/pages/editors/template-editor/template-editor.component';
import { TemplateEditorLayoutComponent } from 'src/app/layouts/template-editor-layout/template-editor-layout.component';
import {RightPanelComponent} from "../../pages/editors/template-editor/components/right-panel/right-panel.component";
import {SideNavComponent} from "../../pages/editors/template-editor/components/side-nav/side-nav.component";
import {TopNavComponent} from "../../pages/editors/template-editor/components/top-nav/top-nav.component";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    TemplateEditorComponent,
    TemplateEditorLayoutComponent,
    RightPanelComponent,
    SideNavComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    TemplateEditorRoutingModule,
    MatButtonModule
  ],
  bootstrap: [TemplateEditorLayoutComponent]
})
export class TemplateEditorModule { }
