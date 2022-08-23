import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordValidationService {
  public customPassValidator(
    firstName: string,
    lastName: string,
    password: string
  ): ValidatorFn {
    return (controls: AbstractControl) => {
      const firstNameControl = controls.get(firstName);
      const lastNameControl = controls.get(lastName);
      const passwordControl = controls.get(password);

      if (
        passwordControl?.errors &&
        !passwordControl.errors['requirements'] &&
        !passwordControl.errors['firstLastNameExists']
      ) {
        return null;
      }

      let firstNameLc =
        firstNameControl?.value && firstNameControl?.value.toLowerCase();
      let lastNameLc =
        lastNameControl?.value && lastNameControl?.value.toLowerCase();
      let passwordLc =
        passwordControl?.value && passwordControl?.value.toLowerCase();

      let hasName =
        (firstNameLc && passwordLc.indexOf(firstNameLc) >= 0) ||
        (lastNameLc && passwordLc.indexOf(lastNameLc) >= 0);

      let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;

      if (
        !passwordCheck.test(passwordControl?.value) &&
        passwordControl?.value
      ) {
        passwordControl.setErrors({ requirements: true });
        return { requirements: true };
      } else if (hasName) {
        passwordControl?.setErrors({ firstLastNameExists: true });
        return { firstLastNameExists: true };
      } else {
        return null;
      }
    };
  }
}
