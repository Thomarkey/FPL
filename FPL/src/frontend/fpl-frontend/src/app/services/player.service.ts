import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<Player[]> {
    console.log('getPlayers method called');
    return this.http.get<Player[]>(this.apiUrl + '/players');
  }

  helloWorld() {
    return this.http.get(this.apiUrl + '/helloWorld');
  }

}
