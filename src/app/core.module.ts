import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthInceptorService } from './auth/auth-interceptor.service';
import { LoggingService } from "./logging.service";

@NgModule ({
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
