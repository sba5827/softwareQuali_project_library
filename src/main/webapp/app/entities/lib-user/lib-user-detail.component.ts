import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILibUser } from 'app/shared/model/lib-user.model';

@Component({
  selector: 'jhi-lib-user-detail',
  templateUrl: './lib-user-detail.component.html'
})
export class LibUserDetailComponent implements OnInit {
  libUser: ILibUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ libUser }) => {
      this.libUser = libUser;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
