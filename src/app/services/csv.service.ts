import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class CsvService {

  public constructor(private httpClient: HttpClient) {
  }

  public getHeaders(): Observable<string[]> {
    return this.httpClient.get<string[]>('/api/headers');
  }

  public getColumnInRange(column: string, ranges: number): Observable<{ data: number[], labels: string[] }> {
    return this.httpClient.get<{ data: number[], labels: string[] }>(`/api/columns/${column}/${ranges}`);
  }

}
