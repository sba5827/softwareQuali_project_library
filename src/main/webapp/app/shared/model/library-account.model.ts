import { ILibUser } from 'app/shared/model/lib-user.model';
import { IBook } from 'app/shared/model/book.model';

export interface ILibraryAccount {
  id?: number;
  name?: string;
  libUsers?: ILibUser[];
  books?: IBook[];
}

export class LibraryAccount implements ILibraryAccount {
  constructor(public id?: number, public name?: string, public libUsers?: ILibUser[], public books?: IBook[]) {}
}
