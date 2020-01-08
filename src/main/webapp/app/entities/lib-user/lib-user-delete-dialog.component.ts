import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILibUser } from 'app/shared/model/lib-user.model';
import { LibUserService } from './lib-user.service';

@Component({
  templateUrl: './lib-user-delete-dialog.component.html'
})
export class LibUserDeleteDialogComponent {
  libUser?: ILibUser;

  constructor(protected libUserService: LibUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.libUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('libUserListModification');
      this.activeModal.close();
    });
  }
}
