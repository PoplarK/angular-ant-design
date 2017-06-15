// import 'reflect-metadata';
import 'core-js';
import 'zone.js';

import './style';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { RootComponent } from './components/root/root';
import { Button, ButtonGroup } from './components/button';
import { Icon } from './components/icon';
import { Alert } from './components/alert';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  declarations: [
    RootComponent,
    Button,
    ButtonGroup,
    Icon,
    Alert,
   ],
  providers: [],
  bootstrap: [ RootComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(success => console.log('bootstrap success', success))
  .catch(error => console.error(error));