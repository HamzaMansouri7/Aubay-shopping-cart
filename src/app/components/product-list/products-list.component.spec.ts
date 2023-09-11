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
    this.testProducts = [
      { id: '1', name: 'Test Product 1', type: 'default', price: 100 },
      { id: '2', name: 'Test Product 2', type: 'promo' , price: 500 },
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
    fixture.detectChanges();
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render products', () => {
    fixture.detectChanges();
    const productElements = fixture.nativeElement.querySelectorAll(
      '.test-product'
    );
    expect(productElements.length).toEqual(fixture.componentInstance.testProducts.length);
  });

  // it('should render custom product types with custom template', () => {
  //   fixture.detectChanges();
  //   const typeTemplate = fixture.nativeElement.querySelector(
  //     '.test-product[type=\'test\']'
  //   );
  //   expect(typeTemplate?.textContent).toContain('TEST TEMPLATE');
  // });

  // it('should render default template if type has no template', () => {
  //   fixture.detectChanges();
  //   const defaultTemplate = fixture.nativeElement.querySelector(
  //     '.test-product[type=\'outlet\']'
  //   );
  //   expect(defaultTemplate?.textContent).toContain('DEFAULT OVERRIDE');
  // });

  // it('should render overridden default template if provided', () => {
  //   fixture.detectChanges();
  //   const overriddenDefaultTemplate = fixture.nativeElement.querySelector(
  //     '.test-product[type=\'default\']'
  //   );
  //   expect(overriddenDefaultTemplate?.textContent).toContain('DEFAULT OVERRIDE');
  // });
});
