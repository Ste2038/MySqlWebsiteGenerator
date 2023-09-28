import { Component } from '@angular/core';
import { Categorie } from '../../classes/categorie-table';

@Component({
  selector: 'app-view-categorie-table',
  templateUrl: './view-categorie-table.component.html',
  styleUrls: ['./view-categorie-table.component.css'],
})

export class ViewCategorieTableComponent {
  displayedColumns: string[] = ['idCategoria',
  'nome',
  'idCategoriaParent',
  'priorita',
  'isEntrata',
  'isUscita',
  'isDeleted',
  ];
  dataSource = [];
}