import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelData } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  
  getData(): Observable<ModelData[]> {
    return this.httpClient.get<ModelData[]>(this.baseUrl);
  }
}
