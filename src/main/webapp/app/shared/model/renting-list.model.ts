import { IBook } from 'app/shared/model/book.model';
import { ILibUser } from 'app/shared/model/lib-user.model';

export interface IRentingList {
  id?: number;
  title?: string;
  description?: string;
  books?: IBook[];
  libUser?: ILibUser;
}

export class RentingList implements IRentingList {
  constructor(public id?: number, public title?: string, public description?: string, public books?: IBook[], public libUser?: ILibUser) {}
}
