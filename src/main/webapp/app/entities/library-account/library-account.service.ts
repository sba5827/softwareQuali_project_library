import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILibraryAccount } from 'app/shared/model/library-account.model';

type EntityResponseType = HttpResponse<ILibraryAccount>;
type EntityArrayResponseType = HttpResponse<ILibraryAccount[]>;

@Injectable({ providedIn: 'root' })
export class LibraryAccountService {
  public resourceUrl = SERVER_API_URL + 'api/library-accounts';

  constructor(protected http: HttpClient) {}

  create(libraryAccount: ILibraryAccount): Observable<EntityResponseType> {
    return this.http.post<ILibraryAccount>(this.resourceUrl, libraryAccount, { observe: 'response' });
  }

  update(libraryAccount: ILibraryAccount): Observable<EntityResponseType> {
    return this.http.put<ILibraryAccount>(this.resourceUrl, libraryAccount, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILibraryAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILibraryAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
