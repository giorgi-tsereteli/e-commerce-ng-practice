import { Component, Input, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { Cart, CartItem } from "src/app/models/cart.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    // Trannsform the array of items into an array of quantities and reduce to single value
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onclearCart(): void {
    this.cartService.clearCart();
  }
}
