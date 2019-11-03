import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http: HttpClient) { }
  
  // get method
  public get(url: string, headers?: HttpHeaders | null): Observable<any> {
    const expandedHeaders = this.prepareHeader(headers);
    return this.http.get<any>(url,expandedHeaders);
}

// post method1
public post(url: string, body: string, headers?: HttpHeaders | null): Observable<any> {
  const expandedHeaders = this.prepareHeader(headers);
    return this.http.post<any>(url, body, expandedHeaders);
}

// Delete method
public delete(url, id?): Observable<any> {
  return this.http.delete<any>(url);
}

private prepareHeader(headers: HttpHeaders | null): object {
  headers = headers || new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  // const Authendication = localStorage.getItem('Auth');
  // if(Authendication){
  //   headers = headers.set('Authorization',"Bearer " +Authendication);
  // }
  headers = headers.set('Accept', 'application/json, text/html, */*');
  //headers = headers.set('Access-Control-Allow-Origin', '*');
  // headers = headers.set('cache-control', 'no-cache');

  return {
      headers: headers,
      observe : "body",
      responseType : "text"
      }
}
}
