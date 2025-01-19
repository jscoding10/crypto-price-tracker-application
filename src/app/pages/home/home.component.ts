import { Component, inject, ViewChild } from '@angular/core';
import { CryptoData } from '../../types/CryptoData';
import { CryptoService } from '../../services/crypto.service';
import { UpperCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UpperCasePipe,
    CurrencyPipe,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginator,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  bannerData?: any[] = [];
  dataSource = new MatTableDataSource<CryptoData>();

  cryptoService = inject(CryptoService);
  router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplay: string[] = [
    'rank',
    'name',
    'current_price',
    'price_change_percentage_24h',
    'market_cap',
  ];

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
    this.dataSource.paginator = this.paginator;
  }

  getBannerData() {
    this.cryptoService.getTrendingCrypto().subscribe((data) => {
      this.bannerData = data;
    });
  }

  getAllData() {
    this.cryptoService.getCryptoList().subscribe((data) => {
      // console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToDetails(row: any) {
    this.router.navigate(['crypto-information', row.id]);
  }

  goToDetailsCard(card: any) {
    this.router.navigate(['crypto-information', card]);
  }
}
