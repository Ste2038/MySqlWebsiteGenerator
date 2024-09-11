import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ServerService } from 'src/app/services/server.service';
import { $[UC_name] } from 'src/app/classes/$[LC_name]-table';

@Component({
  selector: 'app-view-$[LC_name]-table',
  templateUrl: './view-$[LC_name]-table.component.html',
  styleUrls: ['./view-$[LC_name]-table.component.css'],
})

export class View$[UC_name]TableComponent implements AfterViewInit{
  displayedColumns: string[] = [$[for_attrib ('$[attrib_name]',)]];
  dataSource: MatTableDataSource<$[UC_name]> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private server: ServerService){}
  
  ngAfterViewInit(): void {
    let component = this;

    component.server.selectAll$[UC_name](function($[LC_name]:$[UC_name][]){
      component.dataSource = new MatTableDataSource($[LC_name]);

      component.dataSource.paginator = component.paginator;
      component.dataSource.sort = component.sort;
    });
  }
}