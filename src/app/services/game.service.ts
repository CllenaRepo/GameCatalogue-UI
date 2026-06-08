import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, NewGame } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5183/api/games';

  getAll(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  create(game: NewGame): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  update(id: number, game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/${id}`, game);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
