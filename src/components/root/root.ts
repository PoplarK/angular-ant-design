import { Component } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: './root.html'
})
export class RootComponent {

  primaryBtnClassName: string = 'ant-btn ant-btn-primary';
  defaultBtnClassName: string = 'ant-btn';
  dashedBtnClassName: string = 'ant-btn ant-btn-dashed';
  dangerBtnClassName: string = 'ant-btn ant-btn-danger';

  clickBtn = (evt: boolean) => {
    console.log('ssss', evt);
  }
}