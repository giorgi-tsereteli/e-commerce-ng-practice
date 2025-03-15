import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class CartService {
  // BehaviorSubject is a type of Subject, a special type of Observable that allows you to multicast to many Observers.
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    // Checks if item is already in cart
    const itemInCart = items.find((_item) => _item.id === item.id);

    // If item is in cart, increase the quantity by 1
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    // By calling next with {items}, you are updating the state of the cart with the new list of items.
    this.cart.next({ items });
    this._snackBar.open("1 Item addeded to cart", "Ok", { duration: 1000 });
    console.log(this.cart.value);
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart cleared", "Ok", { duration: 1000 });
  }

  removeFromCart(productId: number): void {
    const items = this.cart.value.items.filter((item) => item.id !== productId);
    this.cart.next({ items });
    this._snackBar.open("Item removed from cart", "Ok", { duration: 1000 });
  }

  removeFromCart2(item: CartItem): void {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    this.cart.next({ items: filteredItems });
    this._snackBar.open("Item removed from cart", "Ok", { duration: 1000 });
  }

  removeQuantity(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity -= 1;
      this._snackBar.open("1 item removed from cart", "Ok", { duration: 500 });
      if (itemInCart.quantity === 0) {
        this.removeFromCart2(item); // method to fully clear the cart
      } else {
        this.cart.next({ items });
      }
    } else {
      console.log("Item not found in cart");
    }
  }
}
