import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemControlComponent } from './cart-item-control.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../core/interfaces/product.interface';
import { of } from 'rxjs';

describe('CartItemControlComponent', () => {
  let component: CartItemControlComponent;
  let fixture: ComponentFixture<CartItemControlComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 10,
    imgUrl: 'https://shorturl.at/mtwMP', // Add imgUrl property here
  };
  const mockCartItem: any = {
    amount: 1,
    product: mockProduct,
  };

  beforeEach(() => {
    mockCartService = jasmine.createSpyObj('CartService', [
      'getStoredCartItems',
      'getItemUpdates',
      'addProduct',
      'removeProduct',
    ]);

    TestBed.configureTestingModule({
      declarations: [CartItemControlComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    });

    fixture = TestBed.createComponent(CartItemControlComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStoredCartItems and subscribe to getItemUpdates on ngOnInit', () => {
    mockCartService.getStoredCartItems.and.returnValue();
    mockCartService.getItemUpdates.and.returnValue(of(mockCartItem));

    component.product = mockProduct;
    component.ngOnInit();

    expect(mockCartService.getStoredCartItems).toHaveBeenCalled();
    expect(mockCartService.getItemUpdates).toHaveBeenCalledWith(mockProduct.id);
    expect(component.item).toEqual(mockCartItem);
  });

  it('should call addProduct when addProduct is called', () => {
    component.addProduct(mockProduct);
    expect(mockCartService.addProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should call removeProduct when removeProduct is called', () => {
    component.removeProduct(mockProduct);
    expect(mockCartService.removeProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should unsubscribe from destroy$ on ngOnDestroy', () => {
    spyOn(component.destroy$, 'next');
    spyOn(component.destroy$, 'complete');

    component.ngOnDestroy();

    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });
});
