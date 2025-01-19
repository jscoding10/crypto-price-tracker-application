import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CryptoService } from '../../services/crypto.service';
import { CryptoData } from '../../types/CryptoData';
import { CryptoPortfolioEntry } from '../../types/CryptoPortfolioEntry';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-portfolio-item',
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
  templateUrl: './delete-portfolio-item.component.html',
  styleUrl: './delete-portfolio-item.component.scss',
})
export class DeletePortfolioItemComponent implements OnInit {
  cryptoListArray: CryptoData[] = [];
  filteredOptionsList!: Observable<CryptoData[]>;
  cryptoToDelete?: any;

  cryptoService = inject(CryptoService);
  dialogData: CryptoPortfolioEntry = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  cryptoData = new FormControl<CryptoData>({ value: {}, disabled: true });

  deleteCryptoForm: any = new FormGroup({
    cryptoData: this.cryptoData,
    amount: new FormControl<number | null>({ value: null, disabled: true }),
  });

  constructor() {
    this.cryptoToDelete = this.dialogData;
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

    this.deleteCryptoForm.controls['cryptoData'].setValue({
      name: this.cryptoToDelete.name,
      id: this.cryptoToDelete.id,
      currentPrice: this.cryptoToDelete.currentPrice,
      image: this.cryptoToDelete.image,
      entryTotalValue: this.cryptoToDelete.entryTotalValue,
    });
    this.deleteCryptoForm.controls['amount'].setValue(
      this.cryptoToDelete.amount
    );
  }

  onSubmit() {
    let cryptoId = this.cryptoToDelete.id;
    this.cryptoService.deletePortfolioEntry(cryptoId);
    this.dialogRef.close();
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
