import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngMarkdownEdiotrComponent } from './ang-markdown-ediotr.component';

describe('AngMarkdownEdiotrComponent', () => {
  let component: AngMarkdownEdiotrComponent;
  let fixture: ComponentFixture<AngMarkdownEdiotrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngMarkdownEdiotrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngMarkdownEdiotrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
