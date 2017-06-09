import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';

export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger';
export type ButtonShape = 'circle' | 'circle-outline';
export type ButtonSize = 'small' | 'large';

@Directive({
  selector: 'button'
})
export class ButtonDirective implements OnInit {

  @Input() type?: ButtonType;
  @Input() size?: ButtonSize;
  @Input() className?: string;
  @Input() icon?: string;
  @Input() loading?: boolean;

  @Output() onClick?: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {
    console.log('on constructor: ', this.el.nativeElement);
  }

  ngOnInit() {
    console.log('on init: ', this.el.nativeElement);
  }

  @HostListener('click') handleClick = () => {
    if (this.onClick) {
      this.onClick.emit(true);
    }
  }
}