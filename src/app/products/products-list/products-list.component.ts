import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ConfirmationPopupComponent } from '../../shared-components/confirmation-popup/confirmation-popup.component';
import 'rxjs/add/operator/retry';
import { MainMenuTabService } from '../../shared-services/main-menu-tab.service';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { HelperService } from '../../shared-services/helper.service';
import {
  FormControl, ValidationErrors,
  FormGroupDirective, NgForm, Validators, ValidatorFn, FormBuilder, AbstractControl, FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  dataSource = new MatTableDataSource();

  displayedColumns = ['productId', 'name', 'category', 'status', 'delete', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  myForm: FormGroup;
  statuses = [
    { key: 'active', value: 0 },
    { key: 'inactive', value: 1 },
    { key: 'deleted', value: 2 }
  ];

  constructor(
    public dialog: MatDialog,
    public mainMenuTab: MainMenuTabService,
    private productService: ProductService,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {
    this.myForm = fb.group({
      categoryId: [''],
      name: [''],
      status: ['']
    });
  }

  addNewTab(element): void {
    this.mainMenuTab.addNewTab({
      title: element.name,
      content: `product`,
      tabId: element.productId,
      mainName: 'product',
      disabled: false,
      removable: true
    });
  }

  submitForm(value?) {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        console.log(this.paginator.pageSize);
        const pageSize = this.paginator.pageSize || 5;
        const filter: ProductFilter = {
          name: value.name,
          status: value.status,
          categoryId: value.categoryId,
          pagination: {
            skip: this.paginator.pageIndex * pageSize,
            take: pageSize || 5,
            sort: this.sort.active,
            order: this.sort.direction.toUpperCase()
          }
        };
        return this.productService.productList(filter);
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.length; // data.total_count;

        return data.items;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
      ).subscribe(data => this.dataSource.data = data);
  }

  ngOnInit() {
    this.sort.active = 'productId';
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.submitForm({});
  }

  deleteColum(id) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this employee?' }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.productService.deleteProduct(id)
            .subscribe(() => {
              this.dataSource.data = this.dataSource.data.filter(product => product.productId !== id);
            }, () => { }, () => { }
            );
        }
      });
  }

}
