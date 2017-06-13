import { Directive, ElementRef, EventEmitter, HostListener, HostBinding, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as classNames from 'classnames';
// import omit from 'omit.js';

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

@Directive({
  selector: 'button'
})
export class ButtonDirective implements OnInit, OnChanges {

  static defaultProps = {
    prefixCls: 'ant-btn',
    loading: false,
    clicked: false,
    ghost: false,
  };

  // timeout: number;
  // delayTimeout: number;

  @Input() type?: ButtonType;
  // @Input() htmlType?: string;
  @Input() icon?: string;
  // @Input() shape?: ButtonShape;
  @Input() size?: ButtonSize = 'large';
  @Input() loading?: boolean | { delay?: number };
  @Input() disabled?: boolean;
  // @Input() style?: string;
  @Input() prefixCls?: string = 'ant-btn';
  @Input() className?: string;
  // @Input() ghost?: boolean;

  @Output() onClick?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onMouseDown?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onMouseUp?: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {
    console.log('on constructor: ', this.el.nativeElement);
  }

  ngOnInit() {
    console.log('on init: ', this.el.nativeElement);

    let prefixCls = 'ant-btn';
    // let size = 'small';
    const classes = classNames(prefixCls, {
      // [`${prefixCls}-${size}`]: size,
      // [`${prefixCls}-${type}`]: type,
      // [`${prefixCls}-${shape}`]: shape,
      // [`${prefixCls}-${sizeCls}`]: sizeCls,
      // [`${prefixCls}-icon-only`]: !children && icon,
      // [`${prefixCls}-loading`]: loading,
      // [`${prefixCls}-clicked`]: clicked,
      // [`${prefixCls}-background-ghost`]: ghost,
    }, this.className);
    console.log('cccccc', this.className, classes);

    // this.el.nativeElement.className = classes;
  }

  ngOnChanges(changes: SimpleChanges) {
    let classNameChange = changes.className;
    if (classNameChange) {
      this.resetClasses();
    }
  }

  resetClasses() {
    let classes = classNames(this.prefixCls, {
      [`${this.prefixCls}-loading`]: this.loading,
      [`${this.prefixCls}-${this.size}`]: this.size,
      [`${this.prefixCls}-${this.type}`]: this.type,
      // [`${this.prefixCls}-${shape}`]: shape,
      // [`${this.prefixCls}-${sizeCls}`]: sizeCls,
      // [`${this.prefixCls}-icon-only`]: !children && icon,
      [`${this.prefixCls}-loading`]: this.loading,
      // [`${this.prefixCls}-clicked`]: clicked,
      // [`${this.prefixCls}-background-ghost`]: ghost,
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