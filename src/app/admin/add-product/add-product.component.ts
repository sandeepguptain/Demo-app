import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm: FormGroup;
  categories$ = this.productService.categoryList$
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productService.getCategories().subscribe()
    this.productForm = this.fb.group({
      title: [data.product.title, Validators.required],
      price: [data.product.price, Validators.required],
      description: [data.product.description, Validators.required],
      image: [data.product.image],
      category: [data.product.category || 'electronics', ],
    });
  }
}
