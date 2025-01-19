import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePortfolioItemComponent } from './delete-portfolio-item.component';

describe('DeletePortfolioItemComponent', () => {
  let component: DeletePortfolioItemComponent;
  let fixture: ComponentFixture<DeletePortfolioItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePortfolioItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePortfolioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
