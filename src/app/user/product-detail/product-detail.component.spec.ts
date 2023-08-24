import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/core/modals/products.modal';
import { AngularMaterialModule } from 'src/app/angular-material.module';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productServiceStub: Partial<ProductService>;

  beforeEach(() => {
    productServiceStub = {
      getProduct: jasmine.createSpy().and.returnValue(of({} as Product)),
      productDetils$: of({} as Product) 
    };

    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [AngularMaterialModule],
      providers: [
        { provide: ProductService, useValue: productServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '123' }))
          }
        }
      ]
    });

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  it('should fetch product details on init', () => {
    const productService = TestBed.inject(ProductService);
    const productId = '123';
  
    fixture.detectChanges(); 
  
    expect(productService.getProduct).toHaveBeenCalledWith(productId);
  });
});
