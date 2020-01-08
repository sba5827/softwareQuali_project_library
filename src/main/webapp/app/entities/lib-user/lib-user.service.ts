import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILibUser } from 'app/shared/model/lib-user.model';

type EntityResponseType = HttpResponse<ILibUser>;
type EntityArrayResponseType = HttpResponse<ILibUser[]>;

@Injectable({ providedIn: 'root' })
export class LibUserService {
  public resourceUrl = SERVER_API_URL + 'api/lib-users';

  constructor(protected http: HttpClient) {}

  create(libUser: ILibUser): Observable<EntityResponseType> {
    return this.http.post<ILibUser>(this.resourceUrl, libUser, { observe: 'response' });
  }

  update(libUser: ILibUser): Observable<EntityResponseType> {
    return this.http.put<ILibUser>(this.resourceUrl, libUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILibUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILibUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
