import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
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

  // Return to this part and review why dataSource was added
  dataSoure: Array<CartItem> = [];

  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    // Subscribe to cart changes to update the cart items
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSoure = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(productId: number): void {
    console.log(productId);
    this.cartService.removeFromCart(productId);
  }

  onRemoveFromCart2(item: CartItem): void {
    this.cartService.removeFromCart2(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
    // Initially u made another func in service to add quantity
    // The logic of += 1 is already within addToCart method in the service class
    // this.cartService.addQuantity(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    console.log("Checkout");
    this.http
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51R36qeHhN0WnAkU4X3aE6L2oZnENo7NN0EHl2dgcOmB1mZTP0DX8YmmP91DUqyI5cJUC4EwRtzrfpdOLrIgeECM800D4YATL2y"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
