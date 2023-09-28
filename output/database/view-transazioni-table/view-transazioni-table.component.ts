import { Component } from '@angular/core';
import { Transazioni } from '../../classes/transazioni-table';

@Component({
  selector: 'app-view-transazioni-table',
  templateUrl: './view-transazioni-table.component.html',
  styleUrls: ['./view-transazioni-table.component.css'],
})

export class ViewTransazioniTableComponent {
  displayedColumns: string[] = ['idTransazione',
  'dateTime',
  'importo',
  'idCategoria',
  'idContoFrom',
  'idContoTo',
  'idCurrency',
  'nota',
  'descrizione',
  'isTrasferimento',
  'isDeleted',
  ];
  dataSource = [];
}