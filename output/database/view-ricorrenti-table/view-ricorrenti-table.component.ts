import { Component } from '@angular/core';
import { Ricorrenti } from '../../classes/ricorrenti-table';

@Component({
  selector: 'app-view-ricorrenti-table',
  templateUrl: './view-ricorrenti-table.component.html',
  styleUrls: ['./view-ricorrenti-table.component.css'],
})

export class ViewRicorrentiTableComponent {
  displayedColumns: string[] = ['idRicorrenti',
  'importo',
  'giorniDifferenza',
  'idCategoria',
  'idContoFrom',
  'isMonthly',
  ];
  dataSource = [];
}