import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  moviedb: any[] = [];
  movie: any;
  name: String = '';
  byear: Number = 0;
  allActors: any[] = [];
  avaliables: any[] = [];
  selectedMovies: any[] = [];
  select = 1;
  modObj: any;

  constructor(private dbService: DatabaseService) {}

  showModify(actor) {
    this.reset();
    this.modObj = actor;
    this.name = actor.name;
    this.byear = actor.byear;
    for (let i = 0; i < this.modObj.movies.length; i ++) {
      this.movie = this.modObj.movies[i]._id;
      this.addMovie();
    }
    this.select = 2;
  }

  reset () {
    this.movie = null;
    this.name = '';
    this.byear = 0;
    this.avaliables = this.moviedb.slice(0);
    this.selectedMovies = [];
    this.select = 1;
    this.modObj = null;

  }

  addMovie() {
    for (let i = 0; i < this.avaliables.length; i++) {
      if (this.avaliables[i]['_id'] === this.movie) {
        this.selectedMovies.push(this.avaliables[i]);
        this.avaliables.splice(i, 1);
      }
    }
  }

  deselect(id) {
    for (let i = 0; i < this.selectedMovies.length; i++) {
      if (this.selectedMovies[i]['_id'] === id) {
        this.avaliables.push(this.selectedMovies[i]);
        this.selectedMovies.splice(i, 1);
      }
    }
  }

  onUpdateActor() {
    const obj = { name: this.name, byear: this.byear, movies: []};
    for (let i = 0; i < this.selectedMovies.length; i++) {
      obj.movies.push(this.selectedMovies[i]['_id']);
    }
    this.dbService.updateActor(this.modObj._id, obj).subscribe(result => {
      this.onGetActors();
    });
    this.reset();
  }

  onCreateActor() {
    const obj = { name: this.name, bYear: this.byear, movies: []};
    for (let i = 0; i < this.selectedMovies.length; i++) {
      obj.movies.push(this.selectedMovies[i]['_id']);
    }
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviedb = data;
      this.avaliables = data.slice(0);
    });
  }
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.allActors = data;
      console.log(data);
    });
  }

  onDeleteActor(id) {
    this.dbService.deleteActor(id).subscribe(result => {
      this.onGetActors();
    });
  }

  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }

}
