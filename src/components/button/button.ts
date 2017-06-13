import { Component, ElementRef, EventEmitter, HostListener, HostBinding, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as classNames from 'classnames';
// import omit from 'omit.js';

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

@Component({
  selector: 'button',
  template: '<ng-content></ng-content>'
})
export class ButtonComponent implements OnInit, OnChanges {

  // timeout: number;
  // delayTimeout: number;

  @Input() type?: ButtonType;
  @Input() htmlType?: string;
  @Input() icon?: string; // alterable
  @Input() shape?: ButtonShape; // alterable?
  @Input() size?: ButtonSize; // alterable
  @Input() loading?: boolean | { delay?: number }; // alterable
  @Input() @HostBinding('disabled') disabled?: boolean; // alterable
  // @Input() style?: string;
  @Input() prefixCls?: string = 'ant-btn';
  @Input() className?: string;
  @Input() ghost?: boolean;

  @Output() onClick?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onMouseDown?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onMouseUp?: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {
    console.log('on constructor: ', this.el.nativeElement);
  }

  ngOnInit() {
    console.log('on init: ', this.el.nativeElement);

    this.el.nativeElement.type = this.htmlType || 'button';
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

    let classes = classNames(this.prefixCls, {
      [`${this.prefixCls}-${this.type}`]: this.type,
      [`${this.prefixCls}-${this.shape}`]: this.shape,
      [`${this.prefixCls}-${sizeCls}`]: sizeCls,
      // [`${this.prefixCls}-icon-only`]: !children && icon,
      [`${this.prefixCls}-loading`]: this.loading,
      // [`${this.prefixCls}-clicked`]: clicked,
      [`${this.prefixCls}-background-ghost`]: this.ghost,
    }, this.className);
    this.classes = classes;
  }

  @HostBinding('class') classes: string;

  @HostListener('click') handleClick = () => {
    if (this.onClick) {
      this.onClick.emit(true);
    }
  }

  @HostListener('mousedown') handleMouseDown = () => {
    if (this.onMouseDown) {
      this.onMouseDown.emit(true);
    }
  }

  @HostListener('mouseup') handleMouseUp = () => {
    if (this.onMouseUp) {
      this.onMouseUp.emit(true);
    }
  }
}