import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-city-and-street',
  templateUrl: './city-and-street.component.html',
  styleUrl: './city-and-street.component.scss',
})
export class CityAndStreetComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type: string = 'text';
}
