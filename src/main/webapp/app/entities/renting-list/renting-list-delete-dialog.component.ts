import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRentingList } from 'app/shared/model/renting-list.model';
import { RentingListService } from './renting-list.service';

@Component({
  templateUrl: './renting-list-delete-dialog.component.html'
})
export class RentingListDeleteDialogComponent {
  rentingList?: IRentingList;

  constructor(
    protected rentingListService: RentingListService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rentingListService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rentingListListModification');
      this.activeModal.close();
    });
  }
}
