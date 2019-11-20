import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {


  constructor(private http: HttpClient,public storageService: StorageService) { }
  
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
async delay(ms: number) {
  await new Promise( resolve => setTimeout(resolve, ms) );
  console.log(ms);
}

private prepareHeader(headers: HttpHeaders | null): object {
  //this.delay(3000);
  headers = headers || new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Accept', 'application/json, text/html, */*');
  // const Authendication = localStorage.getItem('Auth');
  // if(Authendication){
  //   headers = headers.set('Authorization',"Bearer " +Authendication);
  // }
 
  //headers = headers.set('Access-Control-Allow-Origin', '*');
  // headers = headers.set('cache-control', 'no-cache');
  // this.storageService.get('auth').then(result => {
   
  //   if (result != null) {
      
  //     headers = headers.set('Authorization',"Bearer " +result);
  //     console.log("result " +headers.get("Authorization"));
  //       }
  //   });
  console.log("result1 " +headers.get("Authorization"));
 
    return {
      headers: headers,
      observe : "body",
      responseType : "text"
      }

    }
}
