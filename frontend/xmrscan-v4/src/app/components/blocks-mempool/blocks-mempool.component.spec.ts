import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksMempoolComponent } from './blocks-mempool.component';

describe('BlocksMempoolComponent', () => {
  let component: BlocksMempoolComponent;
  let fixture: ComponentFixture<BlocksMempoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlocksMempoolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlocksMempoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
