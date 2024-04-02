import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent {
  @Input() control!: FormControl;
  @Input() label: string = 'Password';

  on: string = 'visibility';
  off: string = 'visibility_off';
  isText: boolean = false;
  type: string = 'password';

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
