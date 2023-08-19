import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateEditorRoutingModule } from './template-editor-routing.module';
import { TemplateEditorComponent } from 'src/app/pages/editors/template-editor/template-editor.component';
import { TemplateEditorLayoutComponent } from 'src/app/layouts/template-editor-layout/template-editor-layout.component';
import {RightPanelComponent} from "../../pages/editors/template-editor/components/right-panel/right-panel.component";
import {SideNavComponent} from "../../pages/editors/template-editor/components/side-nav/side-nav.component";
import {TopNavComponent} from "../../pages/editors/template-editor/components/top-nav/top-nav.component";
import {MatButtonModule} from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatIconModule } from '@angular/material/icon'
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { ImageSelectionDialogComponent } from '../../pages/editors/template-editor/components/image-selection-dialog/image-selection-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { BgSelectDialogComponent } from '../../pages/editors/template-editor/components/bg-select-dialog/bg-select-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MockupBgSelectDialogComponent } from 'src/app/pages/editors/mockup-template-editor/components/bg-select-dialog/mockup-bg-select-dialog.component';
import { MockupEditorComponent } from 'src/app/pages/editors/mockup-template-editor/mockup-editor.component';
import { MockupRightPanelComponent } from 'src/app/pages/editors/mockup-template-editor/components/right-panel/mockup-right-panel.component';
import { MockupSideNavComponent } from 'src/app/pages/editors/mockup-template-editor/components/side-nav/mockup-side-nav.component';
import { MockupTopNavComponent } from 'src/app/pages/editors/mockup-template-editor/components/top-nav/mockup-top-nav.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    TemplateEditorComponent,
    TemplateEditorLayoutComponent,
    RightPanelComponent,
    SideNavComponent,
    TopNavComponent,
    ImageSelectionDialogComponent,
    BgSelectDialogComponent,
    MockupBgSelectDialogComponent,
    MockupEditorComponent,
    MockupRightPanelComponent,
    MockupSideNavComponent,
    MockupTopNavComponent
  ],
  imports: [
    CommonModule,
    TemplateEditorRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    NgSelectModule,
    FormsModule,
    MatSliderModule,
    ColorPickerModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTabsModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  bootstrap: [TemplateEditorLayoutComponent]
})
export class TemplateEditorModule { }
