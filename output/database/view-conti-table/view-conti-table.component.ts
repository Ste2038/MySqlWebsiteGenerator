import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServerService } from 'src/app/services/server.service';
import { Conti } from 'src/app/classes/conti-table';

@Component({
  selector: 'app-view-conti-table',
  templateUrl: './view-conti-table.component.html',
  styleUrls: ['./view-conti-table.component.css'],
})

export class ViewContiTableComponent implements AfterViewInit{
  displayedColumns: string[] = ['idConto',
  'nome',
  'valoreIniziale',
  'idUtente',
  'idCurrency',
  'idGruppoConto',
  'isDeleted',
  ];
  dataSource: MatTableDataSource<Conti> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private server: ServerService){}
  
  ngAfterViewInit(): void {
    let component = this;

    component.server.selectAllConti(function(conti:Conti[]){
      component.dataSource = new MatTableDataSource(conti);

      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
    });
  }
}