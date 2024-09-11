import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServerService } from 'src/app/services/server.service';
import { Currency } from 'src/app/classes/currency-table';

@Component({
  selector: 'app-view-currency-table',
  templateUrl: './view-currency-table.component.html',
  styleUrls: ['./view-currency-table.component.css'],
})

export class ViewCurrencyTableComponent implements AfterViewInit{
  displayedColumns: string[] = ['idCurrency',
  'nome',
  'isDeleted',
  ];
  dataSource: MatTableDataSource<Currency> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private server: ServerService){}
  
  ngAfterViewInit(): void {
    let component = this;

    component.server.selectAllCurrency(function(currency:Currency[]){
      component.dataSource = new MatTableDataSource(currency);

      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
    });
  }
}