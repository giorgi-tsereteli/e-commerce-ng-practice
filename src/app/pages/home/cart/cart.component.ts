import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://picsum.photos/150",
        name: "Sneakers",
        price: 100,
        quantity: 2,
        id: 1,
      },
      {
        product: "https://picsum.photos/150",
        name: "Jeans",
        price: 300,
        quantity: 3,
        id: 2,
      },
    ],
  };

  dataSoure: Array<CartItem> = [];

  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.dataSoure = this.cart.items;
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
}
