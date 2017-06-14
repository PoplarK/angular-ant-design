import { Component, ElementRef, ViewChild, EventEmitter, HostListener, HostBinding, Input, Output, OnInit, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import * as classNames from 'classnames';
// import omit from 'omit.js';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
// function isString(str: any) {
//   return typeof str === 'string';
// }

// Insert one space between two chinese characters automatically.
function insertSpace(child: any, needInserted: boolean) {
  // Check the child if is undefined or null.
  if (child == null) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (isTwoCNChar(child)) {
    child = child.split('').join(SPACE);
  }
  return child;
}

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

@Component({
  selector: 'button',
  template: `
    <i anticon [type]="iconType" *ngIf="hasIcon"></i>
    <span [hidden]="!hasContent">{{contentText}}</span>
    <span #contentWrapper>
      <ng-content></ng-content>
    </span>
  `
})
export class ButtonComponent implements OnInit, OnChanges, AfterContentInit {

  // timeout: number;
  // delayTimeout: number;
  private iconType: string;
  private hasIcon: boolean;
  @ViewChild('contentWrapper') contentRef: ElementRef;
  private contentText: string = '';
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

  @HostBinding('class') classes: string;

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

  /*
   * TODO - 1. 无法从 content 中获取 icon 的相关信息，坑啊... bug???
   *        2. find optimized way - for example, use ViewContainerRef etc.
  */
  ngAfterContentInit() {
    console.log("after content init", this.contentRef);
    let contentElement = this.contentRef.nativeElement;
    let text = contentElement.innerText;
    let needInserted = !this.hasIcon;
    this.contentText = insertSpace(text, needInserted) || '';
    this.hasContent = '' !== this.contentText;
    contentElement.remove();
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

    this.classes = classNames(this.prefixCls, {
      [`${this.prefixCls}-${this.type}`]: this.type,
      [`${this.prefixCls}-${this.shape}`]: this.shape,
      [`${this.prefixCls}-${sizeCls}`]: sizeCls,
      // [`${this.prefixCls}-icon-only`]: !children && icon,
      [`${this.prefixCls}-loading`]: this.loading,
      // [`${this.prefixCls}-clicked`]: clicked,
      [`${this.prefixCls}-background-ghost`]: this.ghost,
    }, this.className);
  }

  setIcon() {
    this.iconType = this.loading ? 'loading' : this.icon || '';
    this.hasIcon = '' !== this.iconType;
  }

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