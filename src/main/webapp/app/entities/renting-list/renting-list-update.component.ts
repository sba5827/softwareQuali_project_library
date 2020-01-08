import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRentingList, RentingList } from 'app/shared/model/renting-list.model';
import { RentingListService } from './renting-list.service';

@Component({
  selector: 'jhi-renting-list-update',
  templateUrl: './renting-list-update.component.html'
})
export class RentingListUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [],
    description: []
  });

  constructor(protected rentingListService: RentingListService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rentingList }) => {
      this.updateForm(rentingList);
    });
  }

  updateForm(rentingList: IRentingList): void {
    this.editForm.patchValue({
      id: rentingList.id,
      title: rentingList.title,
      description: rentingList.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rentingList = this.createFromForm();
    if (rentingList.id !== undefined) {
      this.subscribeToSaveResponse(this.rentingListService.update(rentingList));
    } else {
      this.subscribeToSaveResponse(this.rentingListService.create(rentingList));
    }
  }

  private createFromForm(): IRentingList {
    return {
      ...new RentingList(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRentingList>>): void {
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
