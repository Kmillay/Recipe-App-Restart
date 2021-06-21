import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
// import { AuthInceptorService } from "./auth/auth-interceptor.service";
// import { AuthComponent } from "./auth/auth.component";
// import { AuthModule } from "./auth/auth.module";
// import { AuthService } from "./auth/auth.service";
// import { RecipesModule } from "./recipes/recipes.module";
// import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes',
      loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule ) },
  { path: 'shopping-list',
      loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule ) },
  { path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
