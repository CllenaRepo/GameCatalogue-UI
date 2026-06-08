import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-browse',
  imports: [RouterLink, NgbTooltipModule, DecimalPipe],
  templateUrl: './browse.component.html'
})
export class BrowseComponent implements OnInit {
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);
  private readonly modal = inject(NgbModal);

  games = signal<Game[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.loading.set(true);
    this.error.set(null);
    this.gameService.getAll().subscribe({
      next: (data) => { this.games.set(data); this.loading.set(false); },
      error: () => {
        this.error.set('Could not load games. Is the API running?');
        this.loading.set(false);
      }
    });
  }

  editGame(id: number): void {
    this.router.navigate(['/games/edit', id]);
  }

  async confirmDelete(game: Game, confirmTpl: any): Promise<void> {
    try {
      await this.modal.open(confirmTpl, { centered: true }).result;
      this.gameService.delete(game.id).subscribe({
        next: () => this.games.update(list => list.filter(g => g.id !== game.id)),
        error: () => this.error.set('Failed to delete game.')
      });
    } catch {
      this.error.set('Failed to delete game.')
    }
  }

  ratingClass(rating: number): string {
    if (rating >= 9) return 'bg-success';
    if (rating >= 7) return 'bg-primary';
    if (rating >= 5) return 'bg-warning text-dark';
    return 'bg-danger';
  }
}
