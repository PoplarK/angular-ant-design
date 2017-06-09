import { Component } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './root.html'
})
export class RootComponent {

  btnClassName: string = 'btn btn-primary';

  clickBtn = (evt: boolean) => {
    console.log('ssss', evt);
  }
}