import { IBook } from 'app/shared/model/book.model';

export interface IAuthor {
  id?: number;
  authorToken?: string;
  firstName?: string;
  lastName?: string;
  books?: IBook[];
}

export class Author implements IAuthor {
  constructor(
    public id?: number,
    public authorToken?: string,
    public firstName?: string,
    public lastName?: string,
    public books?: IBook[]
  ) {}
}
