import { Routes } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse.component';
import { EditComponent } from './pages/edit/edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', component: BrowseComponent },
  { path: 'games/new', component: EditComponent },
  { path: 'games/edit/:id', component: EditComponent },
  { path: '**', redirectTo: 'games' }
];
