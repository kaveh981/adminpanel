import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EmployeesModule } from './employees/employees.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material';
import { AppComponent } from './app.component';
import { ConfirmationPopupComponent } from './shared-components/confirmation-popup/confirmation-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { TabsModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationPopupComponent,
    MainMenuComponent
  ],
  entryComponents: [ConfirmationPopupComponent],

  imports: [
    BrowserModule,
    EmployeesModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
