import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

const ROWS_HEIGHT: { [id: number]: number } = {
  // The values associated with those keys are also of type number
  // Following values are used for property of mat-grid-list
  // https://material.angular.io/components/grid-list/overview#setting-the-row-height
  1: 400,
  2: 335,
  3: 350,
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;

  // Following 4 lines are all for api implementation
  products: Array<Product> | undefined;
  sort = "desc";
  count = 12;
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    // This method is called when the component is destroyed to avoid memory leaks
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  // This method is called for click event on column count icons
  onColumnsCountChanged(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      // This object is of type CartItem found in cart.model.ts
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  // This method is called for click event on items count icons. Event is emitted from products-header.component.ts
  onItemsCountChange(newCount: number): void {
    this.count = newCount;
    this.getProducts(); // This method is called to get products from the api after the count is changed
  }

  onItemsSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
}
