import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Result } from '../models/file';

@Injectable({
  providedIn: 'root',
})
export class DetectService {
  constructor(private http: HttpClient) {}

  getFRResult(face: any, card: any): Observable<Result> {
    const url = `${environment.api}/getFRResult`;
    const form = new FormData();
    form.append('face', face);
    form.append('card', card);
    return this.http.post<Result>(url, form);
  }
}
