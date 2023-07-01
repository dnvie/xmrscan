import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MempoolComponent } from './mempool.component';

describe('MempoolComponent', () => {
  let component: MempoolComponent;
  let fixture: ComponentFixture<MempoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MempoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MempoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
