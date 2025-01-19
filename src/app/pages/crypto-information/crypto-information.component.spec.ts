import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoInformationComponent } from './crypto-information.component';

describe('CryptoInformationComponent', () => {
  let component: CryptoInformationComponent;
  let fixture: ComponentFixture<CryptoInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
