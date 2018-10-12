import { Component, OnInit} from '@angular/core';
import {DatabaseService} from '../database.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviedb: any[] = [];
  actor: any;
  title: String = '';
  year: Number = 0;
  allActors: any[] = [];
  avaliables: any[] = [];
  selectedActors: any[] = [];
  select = 1;
  modObj: any;

  constructor(private dbService: DatabaseService) {}

  showModify(movie) {
    this.reset();
    this.modObj = movie;
    this.title = movie.title;
    this.year = movie.year;
    for (let i = 0; i < this.modObj.actors.length; i ++) {
      this.actor = this.modObj.actors[i]._id;
      this.addActor();
    }
    this.select = 2;
  }

  reset () {
    this.actor = null;
    this.title = '';
    this.year = 0;
    this.avaliables = this.allActors.slice(0);
    this.selectedActors = [];
    this.select = 1;
    this.modObj = null;

  }

  addActor() {
    for (let i = 0; i < this.avaliables.length; i++) {
      if (this.avaliables[i]['_id'] === this.actor) {
        this.selectedActors.push(this.avaliables[i]);
        this.avaliables.splice(i, 1);
      }
    }
  }

  deselect(id) {
    for (let i = 0; i < this.selectedActors.length; i++) {
      if (this.selectedActors[i]['_id'] === id) {
        this.avaliables.push(this.selectedActors[i]);
        this.selectedActors.splice(i, 1);
      }
    }
  }

  onUpdateMovie() {
    const obj = { title: this.title, year: this.year, actors: []};
    for (let i = 0; i < this.selectedActors.length; i++) {
      obj.actors.push(this.selectedActors[i]['_id']);
    }
    this.dbService.updateMovie(this.modObj._id, obj).subscribe(result => {
      this.onGetMovies();
    });
    this.reset();
  }

  onCreateMovie() {
    const obj = { title: this.title, year: this.year, actors: []};
    for (let i = 0; i < this.selectedActors.length; i++) {
      obj.actors.push(this.selectedActors[i]['_id']);
    }
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviedb = data;
    });
  }
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.allActors = data.slice(0);
      this.avaliables = data.slice(0);
    });
  }

  onDeleteMovie(id) {
    this.dbService.deleteMovie(id).subscribe(result => {
      this.onGetMovies();
    });
  }

  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }

}
