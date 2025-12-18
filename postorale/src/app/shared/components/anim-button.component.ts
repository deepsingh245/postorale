import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { gsap } from 'gsap';

@Component({
    selector: 'app-anim-button',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
    <p-button 
      [label]="label" 
      [icon]="icon" 
      [styleClass]="'p-button-' + severity"
      (onMouseEnter)="hoverIn()"
      (onMouseLeave)="hoverOut()">
    </p-button>
  `
})
export class AnimButtonComponent {
    @Input() label: string = '';
    @Input() icon: string = '';
    @Input() severity: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' = 'primary';

    constructor(private el: ElementRef) { }

    hoverIn() {
        gsap.to(this.el.nativeElement, { scale: 1.05, duration: 0.2, ease: "power1.out" });
    }

    hoverOut() {
        gsap.to(this.el.nativeElement, { scale: 1, duration: 0.2, ease: "power1.out" });
    }
}
