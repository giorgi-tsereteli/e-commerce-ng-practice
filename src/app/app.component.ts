import { Component, OnInit } from "@angular/core";
import { Cart } from "./models/cart.model";
import { CartService } from "./services/cart.service";

@Component({
  selector: "app-root",
  template: `
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = "store";

  // Return to this section tomorrow and add proper comments on how exactly behavior subject works

  // Code for working with behavior subject for cart service
  cart: Cart = { items: [] };

  // Adding cart service using contructor
  constructor(private cartService: CartService) {
    cartService.cart.subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    // After this step, pass the cart to the template of the header component
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
