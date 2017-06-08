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
export class AppModule { }