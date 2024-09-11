import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServerService } from 'src/app/services/server.service';
import { Transazioni } from 'src/app/classes/transazioni-table';

@Component({
  selector: 'app-view-transazioni-table',
  templateUrl: './view-transazioni-table.component.html',
  styleUrls: ['./view-transazioni-table.component.css'],
})

export class ViewTransazioniTableComponent implements AfterViewInit{
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
  dataSource: MatTableDataSource<Transazioni> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private server: ServerService){}
  
  ngAfterViewInit(): void {
    let component = this;

    component.server.selectAllTransazioni(function(transazioni:Transazioni[]){
      component.dataSource = new MatTableDataSource(transazioni);

      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
    });
  }
}