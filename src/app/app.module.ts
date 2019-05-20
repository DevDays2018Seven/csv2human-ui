import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CsvService } from './services/csv.service';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    FormsModule
  ],
  providers: [
    CsvService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
