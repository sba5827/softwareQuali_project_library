import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILibUser } from 'app/shared/model/lib-user.model';
import { LibUserService } from './lib-user.service';
import { LibUserDeleteDialogComponent } from './lib-user-delete-dialog.component';

@Component({
  selector: 'jhi-lib-user',
  templateUrl: './lib-user.component.html'
})
export class LibUserComponent implements OnInit, OnDestroy {
  libUsers?: ILibUser[];
  eventSubscriber?: Subscription;

  constructor(protected libUserService: LibUserService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.libUserService.query().subscribe((res: HttpResponse<ILibUser[]>) => {
      this.libUsers = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLibUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILibUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLibUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('libUserListModification', () => this.loadAll());
  }

  delete(libUser: ILibUser): void {
    const modalRef = this.modalService.open(LibUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.libUser = libUser;
  }
}
