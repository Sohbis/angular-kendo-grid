import { Component } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { sampleProducts } from './products';

import {
  GridDataResult,
  DataStateChangeEvent,
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'my-app',
  template: `
        <kendo-grid
                [data]="gridData"
                [pageable]="true"
                [pageSize]="state.take"
                [skip]="state.skip"
                [sortable]="true"
                [sort]="state.sort"
                [columnMenu]="{ filter: filterable }"
               
                [filter]="state.filter"
                [groupable]="true"
                [group]="state.group"
                (dataStateChange)="dataStateChange($event)"
            >
            <kendo-grid-column field="ProductID" title="ID" [width]="40" [filterable]="false">
            </kendo-grid-column>
            <kendo-grid-column field="ProductName" title="Product Name">
            </kendo-grid-column>
            <kendo-grid-column field="FirstOrderedOn" title="First Ordered On" filter="date" format="{0:d}">
            </kendo-grid-column>
            <kendo-grid-column field="UnitPrice" title="Unit Price" filter="numeric" format="{0:c}">
            </kendo-grid-column>
            <kendo-grid-column field="Discontinued" filter="boolean">
            </kendo-grid-column>
            <ng-template
            kendoPagerTemplate
            let-totalPages="totalPages"
            let-currentPage="currentPage"
          >
            <kendo-pager-prev-buttons></kendo-pager-prev-buttons>
            <kendo-pager-numeric-buttons
              [buttonCount]="buttonCount"
            ></kendo-pager-numeric-buttons>
            <kendo-pager-next-buttons></kendo-pager-next-buttons>
            <kendo-pager-input></kendo-pager-input>
            <kendo-pager-info></kendo-pager-info>
            <kendo-pager-page-sizes [pageSizes]="sizes"></kendo-pager-page-sizes>
          </ng-template>
        </kendo-grid>
`,
})
export class AppComponent {
  public state: State = {
    skip: 0,
    take: 5,
    sort: [],
    group: [],
    filter: {
      logic: 'and',
      filters: [],
    },
  };

  filterable = true;

  public pageSize = 5;
  public buttonCount = 2;
  public sizes = [10, 20, 50];

  public gridData: GridDataResult = process(sampleProducts, this.state);

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(sampleProducts, this.state);
  }
}
