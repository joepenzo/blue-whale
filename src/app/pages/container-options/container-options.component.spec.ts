import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerOptionsComponent } from './container-options.component';

describe('ContainerOptionsComponent', () => {
  let component: ContainerOptionsComponent;
  let fixture: ComponentFixture<ContainerOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
