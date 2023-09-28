import { Component } from '@angular/core';
import { Conti } from '../../classes/conti-table';

@Component({
  selector: 'app-view-conti-table',
  templateUrl: './view-conti-table.component.html',
  styleUrls: ['./view-conti-table.component.css'],
})

export class ViewContiTableComponent {
  displayedColumns: string[] = ['idConto',
  'nome',
  'valoreIniziale',
  'idUtente',
  'idCurrency',
  'idGruppoConto',
  'isDeleted',
  ];
  dataSource = [];
}