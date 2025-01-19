import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoPortfolioEntry } from '../types/CryptoPortfolioEntry';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  cryptoPortfolioEntry: any[] = [];

  httpClient = inject(HttpClient);

  constructor() {}

  getCryptoList(): Observable<any> {
    return this.httpClient.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1'
    );
  }

  getTrendingCrypto(): Observable<any> {
    return this.httpClient.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
    );
  }

  getCryptoInfoById(coinId: string): Observable<any> {
    return this.httpClient.get(
      `https:/api.coingecko.com/api/v3/coins/${coinId}`,
      {}
    );
  }

  getGrpahicalCryptoData(coinId: string, days: number): Observable<any> {
    return this.httpClient.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    );
  }

  createPortfolioEntry(newPortfolioEntry: CryptoPortfolioEntry) {
    this.cryptoPortfolioEntry.push({
      name: newPortfolioEntry.name,
      id: newPortfolioEntry.id,
      currentPrice: newPortfolioEntry.currentPrice,
      image: newPortfolioEntry.image,
      amount: newPortfolioEntry.amount,
      entryTotalValue: newPortfolioEntry.entryTotalValue,
    });
  }

  updatePortfolioEntry(updatePortfolioEntrty: CryptoPortfolioEntry) {
    const index = this.cryptoPortfolioEntry.findIndex(
      (cryptoPortfolioEntry) =>
        cryptoPortfolioEntry.id === updatePortfolioEntrty.id
    );
    this.cryptoPortfolioEntry[index].name = updatePortfolioEntrty.name;
    this.cryptoPortfolioEntry[index].id = updatePortfolioEntrty.id;
    this.cryptoPortfolioEntry[index].currentPrice =
      updatePortfolioEntrty.currentPrice;
    this.cryptoPortfolioEntry[index].image = updatePortfolioEntrty.image;
    this.cryptoPortfolioEntry[index].amount = updatePortfolioEntrty.amount;
    this.cryptoPortfolioEntry[index].entryTotalValue =
      updatePortfolioEntrty.entryTotalValue;
  }

  deletePortfolioEntry(id: string) {
    const index = this.cryptoPortfolioEntry.findIndex(
      (cryptoPortfolioEntry) => cryptoPortfolioEntry.id === id
    );
    this.cryptoPortfolioEntry.splice(index, 1);
  }

  getPortfolioList() {
    return this.cryptoPortfolioEntry;
  }
}
