import { IAuthor } from 'app/shared/model/author.model';
import { ILibraryAccount } from 'app/shared/model/library-account.model';
import { IRentingList } from 'app/shared/model/renting-list.model';
import { Genre } from 'app/shared/model/enumerations/genre.model';

export interface IBook {
  id?: number;
  title?: string;
  isbn?: string;
  authorToken?: string;
  genre?: Genre;
  year?: string;
  rented?: boolean;
  authors?: IAuthor[];
  libraryAccount?: ILibraryAccount;
  rentingList?: IRentingList;
}

export class Book implements IBook {
  constructor(
    public id?: number,
    public title?: string,
    public isbn?: string,
    public authorToken?: string,
    public genre?: Genre,
    public year?: string,
    public rented?: boolean,
    public authors?: IAuthor[],
    public libraryAccount?: ILibraryAccount,
    public rentingList?: IRentingList
  ) {
    this.rented = this.rented || false;
  }
}
