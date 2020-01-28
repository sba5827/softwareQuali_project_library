import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILibraryAccount } from 'app/shared/model/library-account.model';
import { LibraryAccountService } from './library-account.service';
import { LibraryAccountDeleteDialogComponent } from './library-account-delete-dialog.component';

@Component({
  selector: 'jhi-library-account',
  templateUrl: './library-account.component.html'
})
export class LibraryAccountComponent implements OnInit, OnDestroy {
  libraryAccounts?: ILibraryAccount[];
  eventSubscriber?: Subscription;

  constructor(
    protected libraryAccountService: LibraryAccountService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.libraryAccountService.query().subscribe((res: HttpResponse<ILibraryAccount[]>) => {
      this.libraryAccounts = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLibraryAccounts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILibraryAccount): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLibraryAccounts(): void {
    this.eventSubscriber = this.eventManager.subscribe('libraryAccountListModification', () => this.loadAll());
  }

  delete(libraryAccount: ILibraryAccount): void {
    const modalRef = this.modalService.open(LibraryAccountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.libraryAccount = libraryAccount;
  }
}
