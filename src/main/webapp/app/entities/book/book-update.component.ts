import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBook, Book } from 'app/shared/model/book.model';
import { BookService } from './book.service';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author/author.service';
import { ILibraryAccount } from 'app/shared/model/library-account.model';
import { LibraryAccountService } from 'app/entities/library-account/library-account.service';
import { IRentingList } from 'app/shared/model/renting-list.model';
import { RentingListService } from 'app/entities/renting-list/renting-list.service';

type SelectableEntity = IAuthor | ILibraryAccount | IRentingList;

@Component({
  selector: 'jhi-book-update',
  templateUrl: './book-update.component.html'
})
export class BookUpdateComponent implements OnInit {
  isSaving = false;

  authors: IAuthor[] = [];

  libraryaccounts: ILibraryAccount[] = [];

  rentinglists: IRentingList[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    isbn: [],
    authorToken: [],
    genre: [],
    year: [],
    rented: [],
    authors: [],
    libraryAccount: [],
    rentingList: []
  });

  constructor(
    protected bookService: BookService,
    protected authorService: AuthorService,
    protected libraryAccountService: LibraryAccountService,
    protected rentingListService: RentingListService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ book }) => {
      this.updateForm(book);

      this.authorService
        .query()
        .pipe(
          map((res: HttpResponse<IAuthor[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAuthor[]) => (this.authors = resBody));

      this.libraryAccountService
        .query()
        .pipe(
          map((res: HttpResponse<ILibraryAccount[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ILibraryAccount[]) => (this.libraryaccounts = resBody));

      this.rentingListService
        .query()
        .pipe(
          map((res: HttpResponse<IRentingList[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IRentingList[]) => (this.rentinglists = resBody));
    });
  }

  updateForm(book: IBook): void {
    this.editForm.patchValue({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      authorToken: book.authorToken,
      genre: book.genre,
      year: book.year,
      rented: book.rented,
      authors: book.authors,
      libraryAccount: book.libraryAccount,
      rentingList: book.rentingList
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const book = this.createFromForm();
    if (book.id !== undefined) {
      this.subscribeToSaveResponse(this.bookService.update(book));
    } else {
      this.subscribeToSaveResponse(this.bookService.create(book));
    }
  }

  private createFromForm(): IBook {
    return {
      ...new Book(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      isbn: this.editForm.get(['isbn'])!.value,
      authorToken: this.editForm.get(['authorToken'])!.value,
      genre: this.editForm.get(['genre'])!.value,
      year: this.editForm.get(['year'])!.value,
      rented: this.editForm.get(['rented'])!.value,
      authors: this.editForm.get(['authors'])!.value,
      libraryAccount: this.editForm.get(['libraryAccount'])!.value,
      rentingList: this.editForm.get(['rentingList'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBook>>): void {
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

  getSelected(selectedVals: IAuthor[], option: IAuthor): IAuthor {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
