import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as classNames from 'classnames';

export type ButtonSize = 'small' | 'large';

@Component({
  selector: 'button-group',
  styles: ['.ant-btn-group > .ant-btn { margin-right: 0; }'],
  template: `
    <div [ngClass]="classes">
      <ng-content></ng-content>
    </div>
  `
})
export class ButtonGroupComponent implements OnChanges {

  classes: string;

  @Input() size?: ButtonSize;  
  @Input() style?: string; // TODO - React.CSSProperties
  @Input() className?: string;
  @Input() prefixCls?: string;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changedd", changes);

    let prefixCls = 'ant-btn-group';
    if (changes.prefixCls) {
      prefixCls = changes.prefixCls.currentValue;
    }
    let size = '';
    if (changes.size) {
      size = changes.size.currentValue;
    }
    let className = '';
    if (changes.className) {
      className = changes.className.currentValue;
    }

    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        break;
    }

    this.classes = classNames(prefixCls, {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
    }, className);
  }
}