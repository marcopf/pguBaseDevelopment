import { Component, Input, OnInit } from '@angular/core';
import { TableService } from './table.service';

interface TableConfig {
  incomingDataLink: string | null;
  outgoingDataLink: string | null;
  type: "link" | "button" | null;
  text: string | null
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{
  @Input() retrieveUrl: string = "";
  // tableConfig: TableConfig = {
  //   incomingDataLink: null,
  //   outgoingDataLink: null,
  //   type: null,
  //   text: null
  // }
  tableConfig: TableConfig = {
    incomingDataLink: null,
    outgoingDataLink: null,
    type: "link",
    text: "Dettagli"
  }

  ngOnInit(): void {
    console.log(this.retrieveUrl)
    this.tableService.retrieveData(this.retrieveUrl);
  }

  constructor(protected tableService: TableService){
  }
}
