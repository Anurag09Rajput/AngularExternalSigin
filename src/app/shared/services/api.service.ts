import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http:HttpClient) { }

  public get<T>(resourceUrl:string): Observable<T>{
    return this.http.get<T>(resourceUrl);
  }

  public post<T>(resourceUrl:string, data:any):Observable<T>{
    return this.http.post<T>(resourceUrl, data);
  }
}
