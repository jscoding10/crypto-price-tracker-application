import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePortfolioItemComponent } from './update-portfolio-item.component';

describe('UpdatePortfolioItemComponent', () => {
  let component: UpdatePortfolioItemComponent;
  let fixture: ComponentFixture<UpdatePortfolioItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePortfolioItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePortfolioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
