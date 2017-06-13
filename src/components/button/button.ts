import { Component, ElementRef, ViewChild, EventEmitter, HostListener, HostBinding, Input, Output, OnInit, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import * as classNames from 'classnames';
// import omit from 'omit.js';

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

@Component({
  selector: 'button',
  template: `
    <i anticon [type]="iconType" *ngIf="hasIcon"></i>
    <span #contentWrapper [hidden]="!hasContent">
      <ng-content></ng-content>
    </span>
  `
})
export class ButtonComponent implements OnInit, OnChanges, AfterContentInit {

  // timeout: number;
  // delayTimeout: number;
  private iconType: string;
  private hasIcon: boolean;
  @ViewChild('contentWrapper') content: ElementRef;
  private hasContent: boolean = true;

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
    this.setIcon();
  }

  ngAfterContentInit() {
    console.log("after content init", this.content); // TODO - find optimized way - for example, use ViewContainerRef etc.
    this.hasContent = !!this.content.nativeElement.innerText;
  }

  ngOnChanges(changes: SimpleChanges) {
    let changed = false;
    let iconChanged = false;
    for (let key in changes) {
      let change = changes[key];
      if (!change.isFirstChange()) {
        changed = true;
        if('icon' === key || 'loading' === key) {
          iconChanged = true;
        }
      }
    }
    if (changed) {
      this.setClasses();
    }
    if (iconChanged) {
      this.setIcon();
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

  setIcon() {
    this.iconType = this.loading ? 'loading' : this.icon || '';
    this.hasIcon = '' !== this.iconType;
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