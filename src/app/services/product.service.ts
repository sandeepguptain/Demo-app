import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Product, Products } from '../core/modals/products.modal';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';

  private _categoryList = new BehaviorSubject<string[]>([])
  categoryList$ = this._categoryList.asObservable()

  private _productList = new BehaviorSubject<Products>([])
  productList$ = this._productList.asObservable()

  private _productDetils = new BehaviorSubject<Product>({} as Product )
  productDetils$ = this._productDetils.asObservable()

  constructor(private http: HttpClient) {}

  getProducts(category:string): Observable<any> {
    return this.http.get<Products>(`${this.apiUrl}/products/category/${category}`).pipe(tap(res=> this._productList.next(res)));
  }

  getCategories(): Observable<any> {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`).pipe(tap(res=> this._categoryList.next(res) ));
  }

  getProduct(id:number | string): Observable<any> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(tap(res=> this._productDetils.next(res) ));
  }
}
