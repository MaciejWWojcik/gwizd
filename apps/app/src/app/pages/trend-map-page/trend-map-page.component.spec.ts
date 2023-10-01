import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrendMapPageComponent } from './trend-map-page.component';

describe('TrendMapPageComponent', () => {
  let component: TrendMapPageComponent;
  let fixture: ComponentFixture<TrendMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendMapPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrendMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
