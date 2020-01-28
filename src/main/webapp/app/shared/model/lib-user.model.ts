import { IRentingList } from 'app/shared/model/renting-list.model';
import { ILibraryAccount } from 'app/shared/model/library-account.model';

export interface ILibUser {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  rentingList?: IRentingList;
  libraryAccount?: ILibraryAccount;
}

export class LibUser implements ILibUser {
  constructor(
    public id?: number,
    public username?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public rentingList?: IRentingList,
    public libraryAccount?: ILibraryAccount
  ) {}
}
