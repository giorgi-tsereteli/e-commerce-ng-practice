import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class CartService {
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
    this._snackBar.open("1 Item addeded to cart", "Ok", { duration: 2000 });
    console.log(this.cart.value);
  }
}
