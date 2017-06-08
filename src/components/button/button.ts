import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

@Component({
  selector: 'ant-button',
  template: `
    <button (click)="onClick()"></button>
  `
})
export class ButtonComponent {

  @Input() type?: ButtonType;
  @Input() size?: ButtonSize;
  @Input() className?: string;
  @Input() icon?: string;
  @Input() loading?: boolean;

  @Output() onClick?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onMouseUp?: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onMouseDown?: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  handleClick = () => {

    if(this.onClick) {
      this.onClick.emit();
    }
  }

  handleMouseUp = () => {

    if(this.onMouseUp) {
      this.onMouseUp.emit();
    }
  }

  handleMouseDown = () => {
    
    if(this.onMouseDown) {
      this.onMouseDown.emit();
    }
  }
}
