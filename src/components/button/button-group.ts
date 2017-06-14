import { Component, Input, HostBinding, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as classNames from 'classnames';

export type ButtonSize = 'small' | 'large';

@Component({
  selector: '[button-group]',
  styles: [':host.ant-btn-group /deep/ > .ant-btn { margin-right: 0; }'],
  template: `
    <ng-content></ng-content>
  `
})
export class ButtonGroupComponent implements OnInit, OnChanges {

  @HostBinding('class') classes: string = '';

  @Input() size?: ButtonSize;  
  @Input() style?: string; // TODO - React.CSSProperties
  @Input() className?: string;
  @Input() prefixCls?: string = 'ant-btn-group';

  constructor() { }

  ngOnInit() {
    this.setClasses();
  }

  ngOnChanges(changes: SimpleChanges) {
    let changed = false;
    for (let key in changes) {
      let change = changes[key];
      if (!change.isFirstChange()) {
        changed = true;
      }
    }
    if (changed) {
      this.setClasses();
    }
  }

  setClasses() {
    let sizeCls = '';
    switch (this.size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        break;
    }

    this.classes = classNames(this.prefixCls, {
      [`${this.prefixCls}-${sizeCls}`]: sizeCls,
    }, this.className);
  }
}