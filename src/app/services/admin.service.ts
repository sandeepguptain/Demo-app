
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product, Products } from '../core/modals/products.modal';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://fakestoreapi.com';

 

  private _productListWithLimit = new BehaviorSubject<Products>([])
  productListWithLimit$ = this._productListWithLimit.asObservable()


  constructor(private http: HttpClient) {}

  getProductListWithLimit(pageSize:number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/products?limit=${pageSize}`).pipe(tap(res=> this._productListWithLimit.next(res)));
  }

  deleteProduct(id:number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`)
  }

  addProduct(product:Product): Observable<Product> {
    const body = product
    return this.http.post<Product>(`${this.apiUrl}/products`, body)
  }

  getProductListValue(){
   return  this._productListWithLimit.value
  }
}
