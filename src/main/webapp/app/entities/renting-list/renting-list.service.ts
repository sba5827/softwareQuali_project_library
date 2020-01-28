import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRentingList } from 'app/shared/model/renting-list.model';

type EntityResponseType = HttpResponse<IRentingList>;
type EntityArrayResponseType = HttpResponse<IRentingList[]>;

@Injectable({ providedIn: 'root' })
export class RentingListService {
  public resourceUrl = SERVER_API_URL + 'api/renting-lists';

  constructor(protected http: HttpClient) {}

  create(rentingList: IRentingList): Observable<EntityResponseType> {
    return this.http.post<IRentingList>(this.resourceUrl, rentingList, { observe: 'response' });
  }

  update(rentingList: IRentingList): Observable<EntityResponseType> {
    return this.http.put<IRentingList>(this.resourceUrl, rentingList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRentingList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRentingList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
