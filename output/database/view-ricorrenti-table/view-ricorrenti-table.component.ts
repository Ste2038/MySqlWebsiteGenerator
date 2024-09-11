import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServerService } from 'src/app/services/server.service';
import { Ricorrenti } from 'src/app/classes/ricorrenti-table';

@Component({
  selector: 'app-view-ricorrenti-table',
  templateUrl: './view-ricorrenti-table.component.html',
  styleUrls: ['./view-ricorrenti-table.component.css'],
})

export class ViewRicorrentiTableComponent implements AfterViewInit{
  displayedColumns: string[] = ['idRicorrenti',
  'importo',
  'giorniDifferenza',
  'idCategoria',
  'idContoFrom',
  'isMonthly',
  'isDeleted',
  ];
  dataSource: MatTableDataSource<Ricorrenti> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private server: ServerService){}
  
  ngAfterViewInit(): void {
    let component = this;

    component.server.selectAllRicorrenti(function(ricorrenti:Ricorrenti[]){
      component.dataSource = new MatTableDataSource(ricorrenti);

      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
    });
  }
}