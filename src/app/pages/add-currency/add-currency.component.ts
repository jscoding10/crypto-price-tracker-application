import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CryptoService } from '../../services/crypto.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { CryptoData } from '../../types/CryptoData';
import { CryptoPortfolioEntry } from '../../types/CryptoPortfolioEntry';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-currency',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatButtonModule,
    JsonPipe,
    MatCardModule,
  ],
  templateUrl: './add-currency.component.html',
  styleUrl: './add-currency.component.scss',
})
export class AddCurrencyComponent implements OnInit {
  cryptoListArray: CryptoData[] = [];
  filteredOptionsList!: Observable<CryptoData[]>;
  cryptoPortfolioEntry!: CryptoPortfolioEntry;

  router = inject(Router);
  cryptoService = inject(CryptoService);

  cryptoData = new FormControl<CryptoData>({}, Validators.required);
  addCryptoForm: any = new FormGroup({
    cryptoData: this.cryptoData,
    amount: new FormControl<number | null>(null, Validators.required),
  });

  constructor() {
    this.cryptoService.getCryptoList().subscribe((data) => {
      this.cryptoListArray = data;
    });
  }

  onSubmit() {
    this.cryptoPortfolioEntry = {
      name: this.addCryptoForm.value.cryptoData?.name,
      id: this.addCryptoForm.value.cryptoData?.id,
      currentPrice: this.addCryptoForm.value.cryptoData?.current_price,
      image: this.addCryptoForm.value.cryptoData?.image,
      amount: this.addCryptoForm.controls['amount'].value,
      entryTotalValue:
        this.addCryptoForm.value.cryptoData?.current_price *
        this.addCryptoForm.controls['amount'].value,
    };

    this.cryptoService.createPortfolioEntry(this.cryptoPortfolioEntry);

    this.router.navigate(['/portfolio']);
  }

  onChange(option: any) {
    // console.log(option.name);
  }

  onCancel() {
    this.router.navigate(['/portfolio']);
  }

  ngOnInit(): void {
    this.filteredOptionsList = this.cryptoData.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._listfilter(name as string)
          : this.cryptoListArray.slice();
      })
    );
  }

  displayFn(cryptoData: CryptoData): string {
    return cryptoData && cryptoData.name ? cryptoData.name : '';
  }

  private _listfilter(value: string): CryptoData[] {
    const filterValue = value.toLowerCase();

    return this.cryptoListArray.filter((option) =>
      option.name?.toLowerCase().includes(filterValue)
    );
  }
}
