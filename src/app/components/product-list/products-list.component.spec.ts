// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { ProductsListComponent } from './products-list.component';

// import { Component, OnInit } from '@angular/core';
// import { ForProductDirective } from '../../core/directives/for-product.directive';

// import { By } from '@angular/platform-browser';

// @Component({
//   templateUrl: './products-list.component.html',
// })
// export class TestComponent implements OnInit {
//   constructor() {}

//   ngOnInit() {}
// }

// describe('ProductsListComponent', () => {
//   let component: ProductsListComponent;
//   let fixture: ComponentFixture<TestComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ProductsListComponent, TestComponent, ForProductDirective],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestComponent);
//     // fixture.elementRef.nativeElement;
//     component = fixture.debugElement.query(
//       By.directive(ProductsListComponent)
//     ).componentInstance;
//     fixture.detectChanges();
//   });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should render products', () => {
//     component.products = [
//       { id: '123', name: 'Test 123', price: 150 , imgUrl: 'https://shorturl.at/eDMQR' },
//       { id: '124', name: 'Test 124', price: 1500 ,  imgUrl: 'https://shorturl.at/eDMQR' },
//     ];
//     fixture.detectChanges();
//     expect(
//       fixture.debugElement.queryAll(By.css('.list-group-item')).length
//     ).toEqual(component.products.length);
//   });

//   it('should render custom product types with custom template', () => {
//     component.products = [
//       { id: '124', name: 'Test 124', price: 200, type: 'test', imgUrl: 'https://shorturl.at/eDMQR' },
//     ];
//     fixture.detectChanges();
//     expect(
//       fixture.debugElement.query(By.css('.test-product')).nativeElement
//         .textContent
//     ).toContain('TEST TEMPLATE');
//   });

//   it('should render default template provided type has no template', () => {
//     component.products = [
//       { id: '124', name: 'Test 124', price: 150, type: 'outlet' ,  imgUrl: 'https://shorturl.at/eDMQR' },
//     ];
//     fixture.detectChanges();
//     expect(
//       fixture.debugElement.query(By.css('.test-product')).nativeElement
//         .textContent
//     ).toContain('DEFAULT OVERRIDE');
//   });

//   it('should render overriden default template if provided', () => {
//     component.products = [{ id: '124', name: 'Test 124', price: 150 ,  imgUrl: 'https://shorturl.at/eDMQR' }];
//     fixture.detectChanges();
//     expect(
//       fixture.debugElement.query(By.css('.test-product')).nativeElement
//         .textContent
//     ).toContain('DEFAULT OVERRIDE');
//   });
// });
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProductsListComponent } from './products-list.component';

import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ForProductDirective } from '../../core/directives/for-product.directive';
import { Product } from '../../core/interfaces/product.interface';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <products-list [products]="testProducts">
      <ng-container *forProduct="let product; ofType: 'default'">
        <span class="test-product">{{ product.name }} DEFAULT OVERRIDE</span>
      </ng-container>
      <ng-container *forProduct="let product; ofType: 'test'">
        <span class="test-product">{{ product.name }} TEST TEMPLATE</span>
      </ng-container>
    </products-list>
  `,
})
class TestComponent implements OnInit {
  testProducts: Product[] = [];

  constructor() {}

  ngOnInit() {
    // Initialize test products
    this.testProducts = [
      { id: '1', name: 'Test Product 1', type: 'default', price: 100 },
      { id: '2', name: 'Test Product 2', type: 'test' , price: 500 },
      { id: '3', name: 'Test Product 3', type: 'outlet' , price: 500 },
      { id: '4', name: 'Test Product 4', type: 'default' , price: 500 },
    ];
  }
}

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListComponent, TestComponent, ForProductDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.query(
      By.directive(ProductsListComponent)
    ).componentInstance;
    fixture.detectChanges(); // Initialize ngOnInit
  });

  it('should be created', () => {
    fixture.detectChanges(); // Initialize ngOnInit
    expect(component).toBeTruthy();
  });

  it('should render products', () => {
    fixture.detectChanges();
    const productElements = fixture.nativeElement.querySelectorAll(
      '.test-product'
    );
    expect(productElements.length).toEqual(fixture.componentInstance.testProducts.length);
  });

  it('should render custom product types with custom template', () => {
    fixture.detectChanges(); // Initialize the component and render templates
    const typeTemplate = fixture.nativeElement.querySelector(
      '.test-product[type=\'test\']'
    );
    expect(typeTemplate?.textContent).toContain('TEST TEMPLATE'); // Use optional chaining to avoid null error
  });

  it('should render default template if type has no template', () => {
    fixture.detectChanges(); // Initialize the component and render templates
    const defaultTemplate = fixture.nativeElement.querySelector(
      '.test-product[type=\'outlet\']'
    );
    expect(defaultTemplate?.textContent).toContain('DEFAULT OVERRIDE'); // Use optional chaining to avoid null error
  });

  it('should render overridden default template if provided', () => {
    fixture.detectChanges(); // Initialize the component and render templates
    const overriddenDefaultTemplate = fixture.nativeElement.querySelector(
      '.test-product[type=\'default\']'
    );
    expect(overriddenDefaultTemplate?.textContent).toContain('DEFAULT OVERRIDE'); // Use optional chaining to avoid null error
  });
});
