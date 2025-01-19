## Crypto Price Tracker

<!-- <img width="60%" alt="Crypto Portfolio Tracker" src="" /> -->

<!-- <br>
<br> -->

The crypto price tracker is a web application built in Angular that allows users to see various details of the top cryptocurrencies. The details include market cap rank, current price, price change over 24 hours, current market cap, and price charts. Further, users can track the value of their personal cryptocurrency portfolio by adding the names and amounts of tokens they own. Each entry in the portfolio can be updated or deleted. The application also allows users to select light or dark mode.

## Instructions

If you wish to use the cryptocurrency price tracker, please follow the steps below to set up a local copy. To add a cryptocurrency to your portfolio, select the "Add Cryptocurrency" option in the side navigation and fill out the required fields.
<br>

**To set up a local copy, follow these simple steps:**

```
1. cd crypto-portfolio-tracker
2. npm install
3. ng serve
```

The client runs on localhost:4200.

## Technology Used

<img align="left" alt="HTML" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" />
<img align="left" alt="CSS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" />
<img align="left" alt="TypeScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
<img align="left" alt="Angular" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" />
<img align="left" alt="Angular Material" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularmaterial/angularmaterial-original.svg" />
<br>
<br>
<br>

**Client:** HTML, CSS, TypeScript, Angular and Angular Material
<br>
<br>
Once the user loads the application, the user will see the Home page. The Home page contains cards with details regarding the top 10 trending cryptocurrencies in the last 24 hours and a table with details regarding the top 250 cryptocurrencies by market cap. The user can click on a card or a row in the table to be redirected to a crypto information page with information regarding that specific cryptocurrency. The user can also view price charts for the last 24 hours, 30 days, 90 days, or 365 days on this page.
<br>
<br>
The user can add a cryptocurrency to their portfolio by selecting the "Add Cryptocurrency" option in the side navigation. The user will be redirected to the Add Currency page where they can search for the name of the cryptocurrency in the autocomplete and add the amount they own. After clicking the "Add" but_on, the user will be redirected to the Portfolio page. On the Portfolio page, the user can see the image, name, amount, current price, and total value of the entry. Further, the user can update or delete the entry from the Portfolio page. Finally, the table in the Portfolio page provides the user with the total value of all their portfolio entries. The user can access the Portfolio page any time by selecting the "Portfolio" option in the side navigation.

## Optimizations

Originally, I used the NgFor directive without track to iterate over the list of cryptocurrencies and various other objects in the application to render a template for each item in the collection. After conducting some research, I found I could make my application more efficient by using the @for directive to iterate over objects and track to determine a key used to associate array items with views. Utilizing the @for directive and track improved rendering performance and prevented unnecessary manipulations in the application.

## Lessons Learned

While completing the cryptocurrency price tracker, I honed my ability to utilize Angular Material components and design an aesthetic user interface that fetches data from an external source and displays it to the user. Further, I learned how to incorporate and style a line chart using external data into a web application with chart.js and ng2-charts. Finally, I gained an understanding of how to implement light and dark mode using Angular Material in a web application.

## Improvements

One improvement to the application would be to utilize the On Push change detection strategy to optimize my code. This could be implemented in components that do not require frequent updates and it would reduce the number of change detection cycles to improve performance of the application.
<br>
<br>
Another improvement to the application would be to make this application full-stack with user authentication instead of just having a client. Currently, when a user refreshes the page, their portfolio entries are lost. By making this application full-stack, users could save their data in a database and return to it using login credentials.

## Application Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
