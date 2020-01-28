import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ILibUser, LibUser } from 'app/shared/model/lib-user.model';
import { LibUserService } from './lib-user.service';
import { IRentingList } from 'app/shared/model/renting-list.model';
import { RentingListService } from 'app/entities/renting-list/renting-list.service';
import { ILibraryAccount } from 'app/shared/model/library-account.model';
import { LibraryAccountService } from 'app/entities/library-account/library-account.service';

type SelectableEntity = IRentingList | ILibraryAccount;

@Component({
  selector: 'jhi-lib-user-update',
  templateUrl: './lib-user-update.component.html'
})
export class LibUserUpdateComponent implements OnInit {
  isSaving = false;

  rentinglists: IRentingList[] = [];

  libraryaccounts: ILibraryAccount[] = [];

  editForm = this.fb.group({
    id: [],
    username: [],
    firstName: [],
    lastName: [],
    email: [],
    rentingList: [],
    libraryAccount: []
  });

  constructor(
    protected libUserService: LibUserService,
    protected rentingListService: RentingListService,
    protected libraryAccountService: LibraryAccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ libUser }) => {
      this.updateForm(libUser);

      this.rentingListService
        .query({ filter: 'libuser-is-null' })
        .pipe(
          map((res: HttpResponse<IRentingList[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IRentingList[]) => {
          if (!libUser.rentingList || !libUser.rentingList.id) {
            this.rentinglists = resBody;
          } else {
            this.rentingListService
              .find(libUser.rentingList.id)
              .pipe(
                map((subRes: HttpResponse<IRentingList>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRentingList[]) => {
                this.rentinglists = concatRes;
              });
          }
        });

      this.libraryAccountService
        .query()
        .pipe(
          map((res: HttpResponse<ILibraryAccount[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ILibraryAccount[]) => (this.libraryaccounts = resBody));
    });
  }

  updateForm(libUser: ILibUser): void {
    this.editForm.patchValue({
      id: libUser.id,
      username: libUser.username,
      firstName: libUser.firstName,
      lastName: libUser.lastName,
      email: libUser.email,
      rentingList: libUser.rentingList,
      libraryAccount: libUser.libraryAccount
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const libUser = this.createFromForm();
    if (libUser.id !== undefined) {
      this.subscribeToSaveResponse(this.libUserService.update(libUser));
    } else {
      this.subscribeToSaveResponse(this.libUserService.create(libUser));
    }
  }

  private createFromForm(): ILibUser {
    return {
      ...new LibUser(),
      id: this.editForm.get(['id'])!.value,
      username: this.editForm.get(['username'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      rentingList: this.editForm.get(['rentingList'])!.value,
      libraryAccount: this.editForm.get(['libraryAccount'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILibUser>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
