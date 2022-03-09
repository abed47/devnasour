import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateEditorLayoutComponent } from './template-editor-layout.component';

describe('TemplateEditorLayoutComponent', () => {
  let component: TemplateEditorLayoutComponent;
  let fixture: ComponentFixture<TemplateEditorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateEditorLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateEditorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
