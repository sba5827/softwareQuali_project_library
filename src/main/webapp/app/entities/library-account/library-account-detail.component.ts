import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILibraryAccount } from 'app/shared/model/library-account.model';

@Component({
  selector: 'jhi-library-account-detail',
  templateUrl: './library-account-detail.component.html'
})
export class LibraryAccountDetailComponent implements OnInit {
  libraryAccount: ILibraryAccount | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ libraryAccount }) => {
      this.libraryAccount = libraryAccount;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
