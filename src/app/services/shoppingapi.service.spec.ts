import { TestBed } from '@angular/core/testing';

import { ShoppingapiService } from './shoppingapi.service';

describe('ShoppingapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingapiService = TestBed.get(ShoppingapiService);
    expect(service).toBeTruthy();
  });
});
