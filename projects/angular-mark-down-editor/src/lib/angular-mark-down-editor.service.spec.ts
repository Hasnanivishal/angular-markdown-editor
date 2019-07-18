import { TestBed } from '@angular/core/testing';

import { AngularMarkDownEditorService } from './angular-mark-down-editor.service';

describe('AngularMarkDownEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularMarkDownEditorService = TestBed.get(AngularMarkDownEditorService);
    expect(service).toBeTruthy();
  });
});
