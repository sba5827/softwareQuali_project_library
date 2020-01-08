import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRentingList } from 'app/shared/model/renting-list.model';

@Component({
  selector: 'jhi-renting-list-detail',
  templateUrl: './renting-list-detail.component.html'
})
export class RentingListDetailComponent implements OnInit {
  rentingList: IRentingList | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rentingList }) => {
      this.rentingList = rentingList;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
