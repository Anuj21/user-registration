import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { SignUpComponent } from './sign-up.component';

fdescribe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [ApiService, FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the custom password validation', () => {
    const dummyUser = {
      firstName: 'first',
      lastName: 'last',
      password: 'unknownPass',
    };

    const firstName = component.registerForm.controls['firstName'];
    const lastName = component.registerForm.controls['lastName'];
    const password = component.registerForm.controls['password'];

    firstName.setValue(dummyUser.firstName);
    lastName.setValue(dummyUser.lastName);
    password.setValue(dummyUser.password);

    expect(password.valid).toBeTruthy();
  });

  it('should not pass the custom password validation if first or last name in password', () => {
    const dummyUser = {
      firstName: 'first',
      lastName: 'last',
      password: 'unknownPassfirst',
    };

    const firstName = component.registerForm.controls['firstName'];
    const lastName = component.registerForm.controls['lastName'];
    const password = component.registerForm.controls['password'];

    firstName.setValue(dummyUser.firstName);
    lastName.setValue(dummyUser.lastName);
    password.setValue(dummyUser.password);

    expect(password.valid).toBeFalsy();
    expect(password.hasError('firstLastNameExists')).toBe(true);
  });

  it('should not pass the custom password validation if passsword less than 8 character', () => {
    const dummyUser = {
      firstName: 'first',
      lastName: 'last',
      password: 'unKnown',
    };

    const firstName = component.registerForm.controls['firstName'];
    const lastName = component.registerForm.controls['lastName'];
    const password = component.registerForm.controls['password'];

    firstName.setValue(dummyUser.firstName);
    lastName.setValue(dummyUser.lastName);
    password.setValue(dummyUser.password);

    expect(password.valid).toBeFalsy();
    expect(password.hasError('requirements')).toBe(true);
  });

  it('should not pass the custom password validation if passsword doesnt have uppercase', () => {
    const dummyUser = {
      firstName: 'first',
      lastName: 'last',
      password: 'unknown',
    };

    const firstName = component.registerForm.controls['firstName'];
    const lastName = component.registerForm.controls['lastName'];
    const password = component.registerForm.controls['password'];

    firstName.setValue(dummyUser.firstName);
    lastName.setValue(dummyUser.lastName);
    password.setValue(dummyUser.password);

    expect(password.valid).toBeFalsy();
    expect(password.hasError('requirements')).toBe(true);
  });

  it('should pass email validation', () => {
    const email = component.registerForm.controls['email'];
    email.setValue('first@last.fr');
    expect(email.valid).toBeTruthy();
  });

  it('should not pass email validation if @ missing', () => {
    const email = component.registerForm.controls['email'];
    email.setValue('firstNamelastName.fr');
    expect(email.valid).toBeFalsy();
  });

  it('should not pass email validation if . missing', () => {
    const email = component.registerForm.controls['email'];
    email.setValue('first@lastfr');
    expect(email.valid).toBeFalsy();
  });

  it('should be able to submit the form for registration', () => {
    const dummyUser = {
      firstName: 'first',
      lastName: 'last',
      email: 'first@last.fr',
    };

    const firstName = component.registerForm.controls['firstName'];
    const lastName = component.registerForm.controls['lastName'];
    const email = component.registerForm.controls['email'];

    firstName.setValue(dummyUser.firstName);
    lastName.setValue(dummyUser.lastName);
    email.setValue(dummyUser.email);
    const testForm = <FormGroupDirective>{
      value: {
        firstName: 'first',
        lastName: 'last',
        email: 'first@last.fr',
      },
    };
    component.onSubmit(testForm);
    expect(component.isLoading).toEqual(false);
  });
});
