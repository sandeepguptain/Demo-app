import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/modals/products.modal';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  categoryId: string = '';
  products = this.productService.productList$;
  gridColumns = 4;

  constructor(
      private productService: ProductService
  ) {}

}
