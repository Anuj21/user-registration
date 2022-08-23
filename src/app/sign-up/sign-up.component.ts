import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { PasswordValidationService } from '../services/password-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public registerForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    },
    {
      validators: [
        this.passwordValidationService.customPassValidator(
          'firstName',
          'lastName',
          'password'
        ),
      ],
    }
  );
  public hidePassword: boolean = true;
  public isPasswordInvalid: boolean = false;
  public fieldRequired: string = 'This field is required';
  public isLoading: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ApiService,
    private readonly passwordValidationService: PasswordValidationService,
    private readonly snackBar: MatSnackBar
  ) {}

  public emaiErrors() {
    return this.registerForm.get('email')?.hasError('required')
      ? 'This field is required'
      : this.registerForm.get('email')?.hasError('pattern')
      ? 'Not a valid email address'
      : '';
  }

  public getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required')
      ? 'This field is required (The password must be at least eight characters, uppercase and lowercase letters)'
      : this.registerForm.get('password')?.hasError('requirements')
      ? 'Password needs to be at least eight characters, uppercase and lowercase letters'
      : this.registerForm.get('password')?.hasError('firstLastNameExists')
      ? 'Password should not contain first or last name'
      : '';
  }

  public checkValidation(input: string) {
    const validation =
      this.registerForm.get(input)?.invalid &&
      (this.registerForm.get(input)?.dirty ||
        this.registerForm.get(input)?.touched);
    return validation;
  }

  public async onSubmit(form: FormGroupDirective): Promise<void> {
    if (this.registerForm.invalid) {
      return;
    }
    const firstName = this.registerForm.controls['firstName'].value;
    const lastName = this.registerForm.controls['lastName'].value;
    const email = this.registerForm.controls['email'].value;

    try {
      this.isLoading = true;
      this.api.registerUser({ firstName, lastName, email });
      this.isLoading = false;
      this.snackBar.open('User has been created Successfully !!!', '', {
        panelClass: ['success'],
      });
      form.resetForm();
    } catch (e) {
      this.snackBar.open('Error creating user !!!', '', {
        panelClass: ['error'],
      });
    }
  }
}
