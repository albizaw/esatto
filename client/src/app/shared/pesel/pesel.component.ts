import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pesel',
  templateUrl: './pesel.component.html',
  styleUrl: './pesel.component.scss',
})
export class PeselComponent {
  @Input() control!: FormControl;
  @Input() label: string = 'PESEL';
  @Input() placeholder: string = 'Enter your PESEL';
  @Input() type: string = 'text';
}
