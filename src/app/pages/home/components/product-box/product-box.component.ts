import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter();
  @Input() product: Product | undefined

  // Following is before api implementation
  // product: Product | undefined = {
  //   id: 1,
  //   title: "shoes",
  //   price: 100,
  //   category: "shoes",
  //   description: "shoes",
  //   image: "https://picsum.photos/150",
  // };

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
