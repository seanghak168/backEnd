import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasdboardComponent } from './dasdboard.component';

describe('DasdboardComponent', () => {
  let component: DasdboardComponent;
  let fixture: ComponentFixture<DasdboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DasdboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasdboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
