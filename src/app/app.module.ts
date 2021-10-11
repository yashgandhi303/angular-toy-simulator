import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { TableAreaComponent } from "./table-area/table-area.component";
import { ControlPanelComponent } from "./control-panel/control-panel.component";

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    TableAreaComponent,
    ReportComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    MatRadioModule,
    MatButtonModule,
    AppRoutingModule,
    MatSidenavModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
