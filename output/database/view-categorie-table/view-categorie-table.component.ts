import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServerService } from 'src/app/services/server.service';
import { Categorie } from 'src/app/classes/categorie-table';

@Component({
  selector: 'app-view-categorie-table',
  templateUrl: './view-categorie-table.component.html',
  styleUrls: ['./view-categorie-table.component.css'],
})

export class ViewCategorieTableComponent implements AfterViewInit{
  displayedColumns: string[] = ['idCategoria',
  'nome',
  'idCategoriaParent',
  'priorita',
  'isEntrata',
  'isUscita',
  'isDeleted',
  ];
  dataSource: MatTableDataSource<Categorie> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private server: ServerService){}
  
  ngAfterViewInit(): void {
    let component = this;

    component.server.selectAllCategorie(function(categorie:Categorie[]){
      component.dataSource = new MatTableDataSource(categorie);

      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
    });
  }
}