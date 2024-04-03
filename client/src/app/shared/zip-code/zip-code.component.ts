import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-zip-code',
  templateUrl: './zip-code.component.html',
  styleUrl: './zip-code.component.scss',
})
export class ZipCodeComponent {
  @Input() control!: FormControl;
}
