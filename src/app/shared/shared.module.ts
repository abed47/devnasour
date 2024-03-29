import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [BreadCrumbsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    GalleryModule,
    MatSelectModule,
    MatFormFieldModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule
  ],
  exports: [
    BreadCrumbsComponent,
    GalleryModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
