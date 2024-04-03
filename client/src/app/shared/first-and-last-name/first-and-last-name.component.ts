import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-first-and-last-name',
  templateUrl: './first-and-last-name.component.html',
  styleUrl: './first-and-last-name.component.scss',
})
export class FirstAndLastNameComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type: string = 'text';
}
