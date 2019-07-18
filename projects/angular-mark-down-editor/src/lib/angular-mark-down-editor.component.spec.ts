import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularMarkDownEditorComponent } from './angular-mark-down-editor.component';

describe('AngularMarkDownEditorComponent', () => {
  let component: AngularMarkDownEditorComponent;
  let fixture: ComponentFixture<AngularMarkDownEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularMarkDownEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularMarkDownEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
