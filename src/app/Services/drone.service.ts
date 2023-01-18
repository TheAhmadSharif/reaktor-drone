import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry, switchMap } from 'rxjs/operators';
import * as xml2js from 'xml2js';



@Injectable({
  providedIn: 'root'
})
export class DroneService {

   constructor(private http:HttpClient) { }
    //   apiURL = 'https://assignments.reaktor.com/birdnest/drones';
    //  apiURL = 'https://api-yqjp.onrender.com/drone';

      
     apiURL = 'assets/data.xml';
  fetchData(): Observable<any> {
  	 return  this.http.get(this.apiURL,  
      {  
        headers: new HttpHeaders()  
          .set('Content-Type', 'text/xml')  
          .append('Access-Control-Allow-Methods', 'GET')  
          .append('Access-Control-Allow-Origin', '*')  
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      }); 
  }
}
