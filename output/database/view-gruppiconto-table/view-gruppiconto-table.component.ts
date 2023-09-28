import { Component } from '@angular/core';
import { GruppiConto } from '../../classes/gruppiconto-table';

@Component({
  selector: 'app-view-gruppiconto-table',
  templateUrl: './view-gruppiconto-table.component.html',
  styleUrls: ['./view-gruppiconto-table.component.css'],
})

export class ViewGruppiContoTableComponent {
  displayedColumns: string[] = ['idGruppoConto',
  'nome',
  'isDeleted',
  ];
  dataSource = [];
}