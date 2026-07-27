import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityChart } from './priority-chart';

describe('PriorityChart', () => {
  let component: PriorityChart;
  let fixture: ComponentFixture<PriorityChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
