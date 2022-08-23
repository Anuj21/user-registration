import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { ISignUp } from '../sign-up/sign-up.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shohuld be able to register user', () => {
    const dummyUser: ISignUp = {
      firstName: 'test first',
      lastName: 'test last',
      email: 'first@last.fr',
    };

    service.registerUser(dummyUser);

    const request = httpTestingController.expectOne(`${service.url}`);

    expect(request.request.method).toBe('POST');

    request.flush(dummyUser);
  });
});
