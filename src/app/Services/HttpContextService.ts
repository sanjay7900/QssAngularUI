
import {HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpContextService {

  constructor(private _http:HttpClient) { }
 
   public Get<T>(requestPath:string,queryParams: any={},headerparam:any={}):Observable<T>
   {
    let option={headers:this.GetHeader(headerparam),params:this.GetParam(queryParams)}
    console.log(JSON.stringify(option))
     return this._http.get<T>(requestPath,option);
   }

   public Post<T>(requestpath:string,body:any,header:any={}):Observable<T>
   {
    return this._http.post<T>(requestpath,body,{headers:this.GetHeader(header)});
   }

   public Delete<T>(requestPath:string,queryParams: any={},headerparam:any={}):Observable<T>
   {
     return this._http.delete<T>(requestPath,{headers:this.GetHeader(headerparam),params:this.GetParam(queryParams)});
   }

   public Put<T>(requestpath:string,body:any,header:any={}):Observable<T>
   {
      return this._http.put<T>(requestpath,body,{headers:this.GetHeader(header)});
   }
   public Patch<T>(requestPath:string,queryParams: any={},headerparam:any={}):Observable<T>
   {
     return this._http.patch<T>(requestPath,{headers:this.GetHeader(headerparam),params:this.GetParam(queryParams)});
   }

   private GetHeader(headerparam:any):HttpHeaders
   {
          const accessToken=localStorage.getItem('AccessToken')==null?'':localStorage.getItem('AccessToken');
          let header= new HttpHeaders();
          header= header.set('Content-Type','application/json');
          header= header.set('Authorization',`Bearer ${accessToken}`);
           for(const key in headerparam)
            {
                if(headerparam.hasOwnProperty(key))
                {
                 header= header.set(key,headerparam[key]);
                }
           }
          return header;

   }

   private GetParam(param:any):HttpParams
   {
      let _param =new HttpParams()
      for(const key in param){
          if(param.hasOwnProperty(key)){
           _param= _param.set(key,param[key]);
          }
      }
      
      return _param;
   }

}
