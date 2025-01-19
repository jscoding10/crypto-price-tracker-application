import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CryptoService } from '../../services/crypto.service';
import { CryptoPortfolioEntry } from '../../types/CryptoPortfolioEntry';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { MatFooterCell } from '@angular/material/table';
import { MatFooterCellDef } from '@angular/material/table';
import { MatFooterRowDef } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdatePortfolioItemComponent } from '../../components/update-portfolio-item/update-portfolio-item.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeletePortfolioItemComponent } from '../../components/delete-portfolio-item/delete-portfolio-item.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    CurrencyPipe,
    MatFooterCell,
    MatFooterCellDef,
    MatFooterRowDef,
    MatPaginatorModule,
    MatDialogModule,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  cryptoPortfolioDataArray: CryptoPortfolioEntry[] = [];
  dataSource = new MatTableDataSource<CryptoPortfolioEntry>();

  cryptoService = inject(CryptoService);
  dialog = inject(MatDialog);

  columnsToDisplay: string[] = [
    'name',
    'amount',
    'currentPrice',
    'totalValue',
    'update',
    'delete',
  ];

  ngOnInit() {
    this.cryptoPortfolioDataArray = this.cryptoService.getPortfolioList();

    this.dataSource = new MatTableDataSource<CryptoPortfolioEntry>(
      this.cryptoPortfolioDataArray
    );
  }

  onUpdate(crypto: CryptoPortfolioEntry) {
    let dialogRef = this.dialog.open(UpdatePortfolioItemComponent, {
      width: '28%',
      data: crypto,
    });
  }

  onDelete(crypto: CryptoPortfolioEntry) {
    let dialogRef = this.dialog.open(DeletePortfolioItemComponent, {
      width: '28%',
      data: crypto,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.updateDataSource(this.cryptoPortfolioDataArray);
    });
  }

  noSort(x: any, y: any): number {
    return 0;
  }

  getTotalCost() {
    return this.cryptoPortfolioDataArray
      .map((t) => t.entryTotalValue)
      .reduce((acc, value) => acc + value, 0);
  }

  updateDataSource(dataArray: CryptoPortfolioEntry[]) {
    this.dataSource.connect().next(dataArray);
  }
}
