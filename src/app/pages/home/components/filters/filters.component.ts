import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();

  categoriesSubscriptions: Subscription | undefined;
  categories: Array<string> | undefined;

  // Initial version before api implementation
  // categories = ['shoes', 'sports'];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscriptions = this.storeService
      .getAllCategories()
      .subscribe((response) => {
        this.categories = response;
      });
  }

  ngOnDestroy(): void {
    // If subscription exists, unsubscribe to avoid memory leaks
    if (this.categoriesSubscriptions) {
      this.categoriesSubscriptions.unsubscribe();
    }
  }

  onShowCategory(category: string) {
    this.showCategory.emit(category);
  }
}
