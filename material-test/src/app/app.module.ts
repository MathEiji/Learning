import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialCComponent } from './material-c/material-c.component';
import { RouterModule, Routes } from '@angular/router';
import { DatePipe } from '@angular/common';

const router: Routes = [
  {path: '' , component: MaterialCComponent},
  {path: 'components', component: MaterialCComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    MaterialCComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(router,{enableTracing: true}),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
