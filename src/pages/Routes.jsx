import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  FoodRecipeDetails,
  DrinkRecipesDetails,
  FoodProgress,
  DrinkProgress,
  Explorer,
  FoodsExplorer,
  FoodsExplorerByOrigin,
  DrinksExplorer,
  FoodsExplorerByIngredient,
  DrinksByIngredients,
  NotFound,
  Profile,
  DoneRecipes,
  FavoritedRecipes } from '.';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/comidas/:id" component={ FoodRecipeDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkRecipesDetails } />
      <Route exact path="/comidas/:id/in-progress" component={ FoodProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinkProgress } />
      <Route exact path="/explorar" component={ Explorer } />
      <Route
        exact
        path="/explorar/comidas"
        component={ FoodsExplorer }
      />
      <Route exact path="/explorar/bebidas" component={ DrinksExplorer } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ FoodsExplorerByIngredient }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ DrinksByIngredients }
      />
      <Route path="/explorar/comidas/area" component={ FoodsExplorerByOrigin } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ DoneRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoritedRecipes } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
