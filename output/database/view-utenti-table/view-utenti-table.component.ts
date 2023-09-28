import { Component } from '@angular/core';
import { Utenti } from '../../classes/utenti-table';

@Component({
  selector: 'app-view-utenti-table',
  templateUrl: './view-utenti-table.component.html',
  styleUrls: ['./view-utenti-table.component.css'],
})

export class ViewUtentiTableComponent {
  displayedColumns: string[] = ['idUtenti',
  'nome',
  'cognome',
  ];
  dataSource = [];
}