import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsComponentComponent } from './operations-component.component';

describe('OperationsComponentComponent', () => {
  let component: OperationsComponentComponent;
  let fixture: ComponentFixture<OperationsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
