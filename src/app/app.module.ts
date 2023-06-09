import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { registerLocaleData } from '@angular/common';

import localeFr from '@angular/common/locales/fr';
import { FirstCharUppercasePipe } from './pipes/first-char-uppercase.pipe';
import { UppercaseInputDirective } from './directives/uppercase-input.directive';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // <-- NgModel lives here // à ajouter pour le two way binding et les formulaires
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
