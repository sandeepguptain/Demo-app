import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from '../core/modals/products.modal';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  {
  
  displayedColumns: string[] = ['id', 'image', 'title', 'price', 'category', 'actions'];
  dataSource!: MatTableDataSource<Product>;
  pageSizeOptions: number[] = [5, 10, 20];
  productListWithLimit$ = this.adminService.productListWithLimit$

  totalRows: number = 0
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private dialog: MatDialog, private fb: FormBuilder) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.loadProducts(5);
  }

  loadProducts(limit: number): void {
    this.adminService.getProductListWithLimit(limit).subscribe(() => {
      this.dataSource = new MatTableDataSource(this.adminService.getProductListValue());
      this.totalRows = this.adminService.getProductListValue().length
    });
  }

  pageChanged(event: any, paginator: MatPaginator): void {
    const newPageSize = event.pageSize;
    const pageIndex = event.pageIndex;
    this.loadProducts(newPageSize);
    paginator.pageIndex = pageIndex;
  }

  editProduct(product?: Product): void {
      const dialogRef = this.dialog.open(AddProductComponent, {
        width: '400px',
        data: {
          title: product ? 'Edit Product' : 'Add Product',
          product: product ? { ...product } : { title: '', price: 0, description: '', image: '', category: '' },
        },
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          if (product) {
            this.snackBar.open(`Product ${product} ? 'Updated' : 'Addded' successfully`, 'close');
            this.loadProducts(5);
          } else {
            this.snackBar.open('Something went wrong', 'close');
          }
        }
      })
  }
  
  deleteProduct(id: number): void {
    this.adminService.deleteProduct(id).subscribe(
      () => {
        this.snackBar.open('Product deleted successfully', 'close');
        this.loadProducts(5);
      },
      (error) => {
        this.snackBar.open('Error deleting product', 'close');
      }
    )
    
  }
}