import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FarmViewComponent } from './components/farm-view/farm-view.component';

@NgModule({
  declarations: [
    AppComponent,
    FarmViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
