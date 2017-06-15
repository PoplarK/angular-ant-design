import { Component, Input, Output, ViewEncapsulation, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import * as classNames from 'classnames';

type AlertType = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: '[ant-alert]',
  templateUrl: './index.html',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('shrinkOut', [
      state('in', style({height: '*'})),
      transition('void => *', [
        style({height: 0}),
        animate(200, style({height: '*'}))
      ]),
      transition('* => void', [
        style({height: '*'}),
        animate(2000, style({height: 0}))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit, OnChanges {
  private closing: boolean = true;
  private closed: boolean = false;
  private iconType: string = 'default';
  private classes: string = '';
  private _closable: boolean;

  @Input() type?: AlertType;
  @Input() closable?: boolean;
  @Input() closeText?: string;
  @Input() message?: string;
  @Input() description?: string;
  @Input() showIcon?: boolean;
  @Input() prefixCls?: string = 'ant-alert';
  @Input() className?: string;
  @Input() banner?: boolean;

  @Output() onClose?: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.render();
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
      this.render();
    }
  }

  animationStart = (e: any) => {
    console.log("animation start: ", e, ' type: ', typeof e);
  }

  animationEnd = (e: any) => {
    console.log("animation end: ", e);
    this.closed = true;
    this.closing = true;
  }

  render() {
    let type = this.banner && this.type === undefined ? 'warning': this.type || 'info';

    switch (this.type) {
      case 'success':
        this.iconType = 'check-circle';
        break;
      case 'info':
        this.iconType = 'info-circle';
        break;
      case 'error':
        this.iconType = 'cross-circle';
        break;
      case 'warning':
        this.iconType = 'exclamation-circle';
        break;
      default:
        this.iconType = 'default';
    }

    if (this.closeText) {
      this._closable = true;
    } else {
      this._closable = this.closable || false;
    }

    this.classes = classNames(this.prefixCls, {
      [`${this.prefixCls}-${type}`]: true,
      [`${this.prefixCls}-close`]: !this.closing,
      [`${this.prefixCls}-with-description`]: !!this.description,
      [`${this.prefixCls}-no-icon`]: !this.showIcon,
      [`${this.prefixCls}-banner`]: !!this.banner,
    }, this.className);
  }

  handleClose = (e: any) => {
    console.log('alert close event: ', e);

    if (this.onClose) {
      this.onClose.emit();
    }
  }
}