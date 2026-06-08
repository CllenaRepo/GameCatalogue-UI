import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Game, NewGame } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-edit',
  imports: [FormsModule, RouterLink, NgbAlertModule],
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  private readonly gameService = inject(GameService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isNew = signal(true);
  loading = signal(false);
  saving = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);

  game: Game = this.emptyGame();

  readonly currentYear = new Date().getFullYear();
  readonly genres = ['Action', 'Action-Adventure', 'Action RPG', 'Adventure', 'Fighting',
    'Horror', 'MMORPG', 'Platformer', 'Puzzle', 'Racing', 'Roguelike',
    'RPG', 'Shooter', 'Simulation', 'Sports', 'Strategy', 'Survival'];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew.set(false);
      this.loading.set(true);
      this.gameService.getById(+id).subscribe({
        next: (data) => { this.game = data; this.loading.set(false); },
        error: () => { this.error.set('Game not found.'); this.loading.set(false); }
      });
    }
  }

  save(): void {
    this.saving.set(true);
    this.error.set(null);
    this.success.set(null);

    const op = this.isNew()
      ? this.gameService.create(this.game as NewGame)
      : this.gameService.update(this.game.id, this.game);

    op.subscribe({
      next: () => this.router.navigate(['/games']),
      error: () => {
        this.error.set('Failed to save. Please check your input and try again.');
        this.saving.set(false);
      }
    });
  }

  private emptyGame(): Game {
    return { id: 0, title: '', genre: '', platform: '', releaseYear: this.currentYear,
             developer: '', publisher: '', rating: 0, description: '' };
  }
}
