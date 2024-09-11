import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServerService } from 'src/app/services/server.service';
import { GruppiConto } from 'src/app/classes/gruppiconto-table';

@Component({
  selector: 'app-view-gruppiconto-table',
  templateUrl: './view-gruppiconto-table.component.html',
  styleUrls: ['./view-gruppiconto-table.component.css'],
})

export class ViewGruppiContoTableComponent implements AfterViewInit{
  displayedColumns: string[] = ['idGruppoConto',
  'nome',
  'isDeleted',
  ];
  dataSource: MatTableDataSource<GruppiConto> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private server: ServerService){}
  
  ngAfterViewInit(): void {
    let component = this;

    component.server.selectAllGruppiConto(function(gruppiconto:GruppiConto[]){
      component.dataSource = new MatTableDataSource(gruppiconto);

      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
    });
  }
}