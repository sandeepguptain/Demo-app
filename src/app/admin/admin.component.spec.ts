import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { of } from 'rxjs';
import { Product } from '../core/modals/products.modal';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AngularMaterialModule } from '../angular-material.module';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockAdminService: any;
  let mockSnackBar: any;
  let mockDialog: any;

  const mockProducts: Product[] = [
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
            "rate": 4.1,
            "count": 259
        }
    },
  ];
  beforeEach(() => {
    mockAdminService = {
      productListWithLimit$: of(mockProducts),
      getProductListWithLimit: jasmine.createSpy().and.returnValue(of()),
      getProductListValue: () => mockProducts,
      deleteProduct: jasmine.createSpy().and.returnValue(of()),
    };

    mockSnackBar = {
      open: jasmine.createSpy(),
    };

    mockDialog = {
      open: jasmine.createSpy().and.returnValue({ afterClosed: () => of(true) }),
    };

    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        AngularMaterialModule
      ],
      providers: [
        FormBuilder,
        { provide: AdminService, useValue: mockAdminService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    fixture.detectChanges();
    expect(component.displayedColumns).toEqual(['id', 'image', 'title', 'price', 'category', 'actions']);
    expect(component.pageSizeOptions).toEqual([5, 10, 20]);
    expect(component.totalRows).toBe(0);
  });

  it('should load products on ngOnInit', () => {
    spyOn(component, 'loadProducts');
    component.ngOnInit();
    expect(component.loadProducts).toHaveBeenCalledWith(5);
  });

  it('should load products with correct limit', () => {
    component.loadProducts(10);
    expect(mockAdminService.getProductListWithLimit).toHaveBeenCalledWith(10);
  });

  it('should update paginator page index on pageChanged', () => {
    const mockPaginator = { pageIndex: 1 };
    component.loadProducts = jasmine.createSpy();
    component.pageChanged({ pageSize: 5, pageIndex: 2 }, mockPaginator as MatPaginator);
    expect(component.loadProducts).toHaveBeenCalledWith(5);
    expect(mockPaginator.pageIndex).toBe(2);
  });



  it('should render MatTable and MatPaginator', () => {
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('table')).nativeElement;
    const paginator = fixture.debugElement.query(By.directive(MatPaginator)).nativeElement;
    expect(table).toBeTruthy();
    expect(paginator).toBeTruthy();
  });
  

})
