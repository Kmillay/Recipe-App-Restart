import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.store.select('shoppingList').subscribe();
    // this.ingredients = this.slService.getIngredients();
    // this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );

    this.loggingService.printLog('Hello from Shopping List Component');
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  ngOndestroy() {
    this.subscription.unsubscribe();
  }

}
