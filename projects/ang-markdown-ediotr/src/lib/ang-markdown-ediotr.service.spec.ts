import { TestBed } from '@angular/core/testing';

import { AngMarkdownEdiotrService } from './ang-markdown-ediotr.service';

describe('AngMarkdownEdiotrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngMarkdownEdiotrService = TestBed.get(AngMarkdownEdiotrService);
    expect(service).toBeTruthy();
  });
});
