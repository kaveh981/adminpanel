
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';

import {
  MatTabsModule,
  MatButtonModule, MatCardModule, MatInputModule, MatTableModule,
  MatSnackBarModule, MatCheckboxModule, MatListModule, MatSelectModule, MatIconModule, MatPaginatorModule,
  MatSortModule, MatGridListModule, MatStepperModule, MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TreeModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatChipsModule
  ],
  entryComponents: [],

  providers: [],

  declarations: [],

  exports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    TreeModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatGridListModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatChipsModule
  ]
})

export class ModuleSharedModule { }
