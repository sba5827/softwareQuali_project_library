import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILibraryAccount, LibraryAccount } from 'app/shared/model/library-account.model';
import { LibraryAccountService } from './library-account.service';

@Component({
  selector: 'jhi-library-account-update',
  templateUrl: './library-account-update.component.html'
})
export class LibraryAccountUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected libraryAccountService: LibraryAccountService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ libraryAccount }) => {
      this.updateForm(libraryAccount);
    });
  }

  updateForm(libraryAccount: ILibraryAccount): void {
    this.editForm.patchValue({
      id: libraryAccount.id,
      name: libraryAccount.name
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const libraryAccount = this.createFromForm();
    if (libraryAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.libraryAccountService.update(libraryAccount));
    } else {
      this.subscribeToSaveResponse(this.libraryAccountService.create(libraryAccount));
    }
  }

  private createFromForm(): ILibraryAccount {
    return {
      ...new LibraryAccount(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILibraryAccount>>): void {
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
}
