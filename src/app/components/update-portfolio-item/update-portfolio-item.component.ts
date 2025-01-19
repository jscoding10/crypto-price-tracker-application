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
import { CryptoData } from '../../types/CryptoData';
import { CryptoPortfolioEntry } from '../../types/CryptoPortfolioEntry';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-update-portfolio-item',
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
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './update-portfolio-item.component.html',
  styleUrl: './update-portfolio-item.component.scss',
})
export class UpdatePortfolioItemComponent implements OnInit {
  cryptoListArray: CryptoData[] = [];
  filteredOptionsList!: Observable<CryptoData[]>;
  cryptoToUpdate?: any;
  updatedPriceData?: CryptoData;

  router = inject(Router);
  cryptoService = inject(CryptoService);
  dialogData: CryptoPortfolioEntry = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  cryptoData = new FormControl<CryptoData>({}, Validators.required);

  updateCryptoForm: any = new FormGroup({
    cryptoData: this.cryptoData,
    amount: new FormControl<number | null>(null, Validators.required),
  });

  constructor() {
    this.cryptoService.getCryptoList().subscribe((data) => {
      this.cryptoListArray = data;
    });

    this.cryptoToUpdate = {
      name: this.dialogData.name,
      id: this.dialogData.id,
      currentPrice: this.dialogData.currentPrice,
      image: this.dialogData.image,
      amount: this.dialogData.amount,
      entryTotalValue: this.dialogData.entryTotalValue,
    };
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

    this.updateCryptoForm.controls['cryptoData'].setValue({
      name: this.cryptoToUpdate.name,
      id: this.cryptoToUpdate.id,
      currentPrice: this.cryptoToUpdate.currentPrice,
      image: this.cryptoToUpdate.image,
      entryTotalValue: this.cryptoToUpdate.entryTotalValue,
    });
    this.updateCryptoForm.controls['amount'].setValue(
      this.cryptoToUpdate.amount
    );
  }

  onSubmit() {
    this.cryptoService
      .getCryptoInfoById(this.cryptoToUpdate.id)
      .subscribe((data) => {
        this.cryptoToUpdate = {
          name: this.updateCryptoForm.value.cryptoData?.name,
          id: this.updateCryptoForm.value.cryptoData?.id,
          currentPrice: data.market_data.current_price.usd,
          image: this.updateCryptoForm.value.cryptoData?.image,
          amount: this.updateCryptoForm.controls['amount'].value,
          entryTotalValue:
            data.market_data.current_price.usd *
            this.updateCryptoForm.controls['amount'].value,
        };
        this.cryptoService.updatePortfolioEntry(this.cryptoToUpdate);
        this.dialogRef.close();
      });
  }

  onChange(option: any) {
    // console.log(option.name);
  }

  onCancel() {
    this.dialogRef.close();
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
