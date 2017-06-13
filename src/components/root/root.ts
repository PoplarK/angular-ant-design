import { Component } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './root.html'
})
export class RootComponent {

  primaryBtnClassName: string = 'ant-btn-primary';
  defaultBtnClassName: string = '';
  dashedBtnClassName: string = 'ant-btn-dashed';
  dangerBtnClassName: string = 'ant-btn-danger';

  clickBtn = (evt: boolean) => {
    console.log('ssss', evt);
  }
}