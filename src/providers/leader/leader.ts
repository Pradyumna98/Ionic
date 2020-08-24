import { Injectable } from '@angular/core';
import { Leader } from '../../shared/leader';
import { Observable } from 'rxjs/Observable';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';



/*
  Generated class for the LeaderProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LeaderProvider {
  HttpClient: any;

  constructor(public http: HttpClient,
              private processHTTPMsgService: ProcessHttpmsgProvider) { }

  getLeaders(): Observable<Leader[]> {
    return this.HttpClient.get(baseURL + 'leaders')
                    .map(response => { return this.processHTTPMsgService.extractData(response); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getLeader(id: number): Observable<Leader> {
    return  this.HttpClient.get(baseURL + 'leaders/'+ id)
                    .map(response => { return this.processHTTPMsgService.extractData(response); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.HttpClient.get(baseURL + 'leaders?featured=true')
                    .map(response => { return this.processHTTPMsgService.extractData(response)[0]; })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

}