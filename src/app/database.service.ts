import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getActors() {
    return this.http.get('/actors');
  }

  getActor(id: string) {
    const url = '/actors/' + id;
    return this.http.get(url);
  }

  createActor(data) {
    return this.http.post('/actors', data, this.httpOptions);
  }

  updateActor(id, data) {
    const url = '/actors/' + id;
    return this.http.put(url, data, this.httpOptions);
  }

  deleteActor(id) {
    const url = '/actors/' + id;
    return this.http.delete(url, this.httpOptions);
  }
  getMovies() {
    return this.http.get('/movies');
  }

  getMovie(id: string) {
    const url = '/movies/' + id;
    return this.http.get(url);
  }

  createMovie(data) {
    return this.http.post('/movies', data, this.httpOptions);
  }

  updateMovie(id, data) {
    const url = '/movies/' + id;
    return this.http.put(url, data, this.httpOptions);
  }

  deleteMovie(id) {
    const url = '/movies/' + id;
    return this.http.delete(url, this.httpOptions);
  }
}
