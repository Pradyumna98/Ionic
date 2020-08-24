import { Injectable } from '@angular/core';
import { Promotion } from '../../shared/promotion';
import { Observable } from 'rxjs/Observable';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';

/*
  Generated class for the PromotionProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PromotionProvider {
  HttpClient: any;

  constructor(public http: HttpClient,
              private processHTTPMsgService: ProcessHttpmsgProvider) { }

  getPromotions(): Observable<Promotion[]> {
    return this.HttpClient.get(baseURL + 'promotions')
                    .map(response => { return this.processHTTPMsgService.extractData(response); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.HttpClient.get(baseURL + 'promotions/'+ id)
                    .map(response => { return this.processHTTPMsgService.extractData(response); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.HttpClient.get(baseURL + 'promotions?featured=true')
                    .map(response => { return this.processHTTPMsgService.extractData(response)[0]; })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

}