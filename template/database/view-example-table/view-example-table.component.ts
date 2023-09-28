import { Component } from '@angular/core';
import { $[UC_name] } from '../../classes/$[LC_name]-table';

@Component({
  selector: 'app-view-$[LC_name]-table',
  templateUrl: './view-$[LC_name]-table.component.html',
  styleUrls: ['./view-$[LC_name]-table.component.css'],
})

export class View$[UC_name]TableComponent {
  displayedColumns: string[] = [$[for_attrib ('$[attrib_name]',)]];
  dataSource = [];
}