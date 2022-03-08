import { TestBed } from '@angular/core/testing';

import { 2dEditorService } from './2d-editor.service';

describe('2dEditorService', () => {
  let service: 2dEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(2dEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
