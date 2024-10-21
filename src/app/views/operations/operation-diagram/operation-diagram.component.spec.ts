import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDiagramComponent } from './operation-diagram.component';

describe('OperationDiagramComponent', () => {
  let component: OperationDiagramComponent;
  let fixture: ComponentFixture<OperationDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationDiagramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
