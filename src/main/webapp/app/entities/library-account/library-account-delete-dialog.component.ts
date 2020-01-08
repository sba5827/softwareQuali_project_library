import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILibraryAccount } from 'app/shared/model/library-account.model';
import { LibraryAccountService } from './library-account.service';

@Component({
  templateUrl: './library-account-delete-dialog.component.html'
})
export class LibraryAccountDeleteDialogComponent {
  libraryAccount?: ILibraryAccount;

  constructor(
    protected libraryAccountService: LibraryAccountService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.libraryAccountService.delete(id).subscribe(() => {
      this.eventManager.broadcast('libraryAccountListModification');
      this.activeModal.close();
    });
  }
}
