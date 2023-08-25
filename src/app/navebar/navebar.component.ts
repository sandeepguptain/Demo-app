import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navebar',
  templateUrl: './navebar.component.html',
  styleUrls: ['./navebar.component.scss']
})
export class NavebarComponent implements OnInit {
  categoryList = this.productService.categoryList$
  categoryId: string = '';
  constructor(private productService: ProductService, private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.productService.getCategories().subscribe();
    this.getProducts('electronics')
  }


  getProducts(item: string) {
    this.productService.getProducts(item).subscribe();
  }
}
