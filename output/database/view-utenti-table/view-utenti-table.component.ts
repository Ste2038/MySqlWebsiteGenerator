import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServerService } from 'src/app/services/server.service';
import { Utenti } from 'src/app/classes/utenti-table';

@Component({
  selector: 'app-view-utenti-table',
  templateUrl: './view-utenti-table.component.html',
  styleUrls: ['./view-utenti-table.component.css'],
})

export class ViewUtentiTableComponent implements AfterViewInit{
  displayedColumns: string[] = ['idUtenti',
  'nome',
  'cognome',
  'isDeleted',
  ];
  dataSource: MatTableDataSource<Utenti> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private server: ServerService){}
  
  ngAfterViewInit(): void {
    let component = this;

    component.server.selectAllUtenti(function(utenti:Utenti[]){
      component.dataSource = new MatTableDataSource(utenti);

      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
    });
  }
}