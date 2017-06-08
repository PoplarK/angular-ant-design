// import 'reflect-metadata';
import 'core-js';
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RootComponent } from './components/root/root';
import { ButtonComponent } from './components/button/button';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    RootComponent,
    ButtonComponent
   ],
  providers: [],
  bootstrap: [ RootComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(success => console.log('bootstrap success', success))
  .catch(error => console.error(error));