import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ActorComponent } from './actor/actor.component';
import { MovieComponent } from './movie/movie.component';
import {DatabaseService} from './database.service';

const appRoutes: Routes = [
  { path: "actors", component: ActorComponent },
  { path: "movies", component: MovieComponent },
  { path: "", redirectTo: "/actors", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    MovieComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),

    FormsModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
