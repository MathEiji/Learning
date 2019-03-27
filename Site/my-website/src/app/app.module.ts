import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavComponent, NavEmailDialog } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavComponent,
    NavEmailDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [NavComponent, NavEmailDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
