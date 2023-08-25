import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AddProductComponent } from './add-product.component';
import { ProductService } from 'src/app/services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let mockDialogRef: MatDialogRef<AddProductComponent>;
  let productService: ProductService;

  const mockProductService = {
    categoryList$: of(['electronics', 'clothing', 'accessories']),
    getCategories: () => of()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, AngularMaterialModule,  BrowserAnimationsModule ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { product: { title: '', price: 0, description: '', image: '', category: '' } } },
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productForm with default values', () => {
    expect(component.productForm.value).toEqual({
      title: '',
      price: 0,
      description: '',
      image: '',
      category: 'electronics'
    });
  });

  
});

