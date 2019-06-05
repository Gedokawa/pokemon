import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PokeSearchComponent } from './poke-search/poke-search.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { RouterModule, Routes } from '@angular/router';
import { AllPokemonsComponent } from './all-pokemons/all-pokemons.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlToIdPipe } from './url-to-id.pipe';
import { PokemonCatchedComponent } from './pokemon-catched/pokemon-catched.component';

const routes: Routes = [
  {
    path: '',
    component: AllPokemonsComponent
  },
  {
    path: 'pokedex',
    component: ListComponent
  },
  {
    path: 'search',
    component: PokeSearchComponent
  },
  {
    path: 'details',
    component: PokemonDetailsComponent
  },
  {
    path: 'evolve',
    component: PokemonCatchedComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PokeSearchComponent,
    PageNotFoundComponent,
    AllPokemonsComponent,
    PokemonDetailsComponent,
    UrlToIdPipe,
    PokemonCatchedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatPaginatorModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
