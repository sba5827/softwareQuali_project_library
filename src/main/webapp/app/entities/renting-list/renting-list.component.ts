import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRentingList } from 'app/shared/model/renting-list.model';
import { RentingListService } from './renting-list.service';
import { RentingListDeleteDialogComponent } from './renting-list-delete-dialog.component';

@Component({
  selector: 'jhi-renting-list',
  templateUrl: './renting-list.component.html'
})
export class RentingListComponent implements OnInit, OnDestroy {
  rentingLists?: IRentingList[];
  eventSubscriber?: Subscription;

  constructor(
    protected rentingListService: RentingListService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.rentingListService.query().subscribe((res: HttpResponse<IRentingList[]>) => {
      this.rentingLists = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRentingLists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRentingList): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRentingLists(): void {
    this.eventSubscriber = this.eventManager.subscribe('rentingListListModification', () => this.loadAll());
  }

  delete(rentingList: IRentingList): void {
    const modalRef = this.modalService.open(RentingListDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rentingList = rentingList;
  }
}
