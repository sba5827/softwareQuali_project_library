import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'library-account',
        loadChildren: () => import('./library-account/library-account.module').then(m => m.LibraryLibraryAccountModule)
      },
      {
        path: 'lib-user',
        loadChildren: () => import('./lib-user/lib-user.module').then(m => m.LibraryLibUserModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.LibraryBookModule)
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.LibraryAuthorModule)
      },
      {
        path: 'renting-list',
        loadChildren: () => import('./renting-list/renting-list.module').then(m => m.LibraryRentingListModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class LibraryEntityModule {}
