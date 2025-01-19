import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AddCurrencyComponent } from './pages/add-currency/add-currency.component';
import { CryptoInformationComponent } from './pages/crypto-information/crypto-information.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'add-currency', component: AddCurrencyComponent },
  { path: 'crypto-information/:id', component: CryptoInformationComponent },
];
