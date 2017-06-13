import { Component } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './root.html'
})
export class RootComponent {

  loading: boolean = false;

  clickBtn = (evt: boolean) => {
    console.log('clickBtn ', evt);
    this.loading = true;
    setTimeout(() => { this.loading = false; }, 2000);
  }
}