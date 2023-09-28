import { Component } from '@angular/core';
import { Currency } from '../../classes/currency-table';

@Component({
  selector: 'app-view-currency-table',
  templateUrl: './view-currency-table.component.html',
  styleUrls: ['./view-currency-table.component.css'],
})

export class ViewCurrencyTableComponent {
  displayedColumns: string[] = ['idCurrency',
  'nome',
  ];
  dataSource = [];
}