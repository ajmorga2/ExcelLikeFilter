import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import {MatSelect, MatSelectModule} from '@angular/material/select'
import {MatTableDataSource, MatTableModule} from '@angular/material/table';




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Array<PeriodicElement> = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource: MatTableDataSource<any>;
  dataSourceOnLoad!: MatTableDataSource<any>;
  columnDropdownOptions: Array<any> = [];
  @ViewChildren('mySel') skillSel!: QueryList<MatSelect>;
  newOption!: MatSelect;

  @ViewChildren('myOption') option!: QueryList<MatOption>;
  

  @ViewChildren('checkbox') checkboxes!: QueryList<any>;
  allSelected: boolean = true;
  numbers = []
  





constructor() {
  this.dataSource =  new MatTableDataSource(ELEMENT_DATA);  
  this.dataSourceOnLoad = new MatTableDataSource(ELEMENT_DATA); 
  
}
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

ngAfterContentInit() {
  this.dataSource.filteredData.forEach((value:any)=> {
    this.numbers = this.numbers.concat(Object.values(value))
  })

}

  dropDown(mySel:any, column:string) {
    this.columnDropdownOptions = []
    let property = column
    let rows = this.dataSourceOnLoad.filteredData;

      for(var index in rows) {
      this.columnDropdownOptions.push(rows[index][property])
    }
  }


  selectAll(checkbox:any, id?:any) {
    let columnIndex = this.getColumnIndex(id)
    this.newOption = this.skillSel.toArray()[columnIndex]

    if (checkbox.checked) {
      this.newOption.options.forEach( (option : MatOption) => {option.deselect()});

    } else {
      this.newOption.options.forEach((option: MatOption) => {
        //this.dataSource.data = []
        option.select()
        let rowSel = this.getRowSelected(option.value,id)
        this.dataSource.data = this.dataSourceOnLoad.data
      });
    }


  }

  getRowSelected(option:any, id:any) {
     return this.dataSourceOnLoad.filteredData.filter(obj => obj[id] == option)
  }

  getColumnIndex(id:any) {
    return this.displayedColumns.indexOf(id)
  }

  applyFilter(myOption: any, id?: any) {
    let columnIndex = this.getColumnIndex(id)
    let checkBoxOption = this.checkboxes.toArray()[columnIndex]
    checkBoxOption.checked = false; 
    let rowSelection = this.getRowSelected(myOption.value,id)
    let isRendered = this.dataSource.data.some(data => data.name ==rowSelection[0].name)

    if (myOption.selected) {
      if(!isRendered) {
        this.dataSource.data = this.dataSource.data.concat(rowSelection)
      } else {
        this.dataSource.data = rowSelection
      }
      
    } else {
     this.dataSource.data = this.dataSource.filteredData.filter(value => value[id] != myOption.value)
  
    }
 
   
  }

  onClick(x:any) {
      console.log(x)
      
  }

  
}
