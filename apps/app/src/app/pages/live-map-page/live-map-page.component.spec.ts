import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveMapPageComponent } from './live-map-page.component';

describe('LiveMapPageComponent', () => {
  let component: LiveMapPageComponent;
  let fixture: ComponentFixture<LiveMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveMapPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
