import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsribersComponent } from './subsribers.component';

describe('SubsribersComponent', () => {
  let component: SubsribersComponent;
  let fixture: ComponentFixture<SubsribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsribersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
