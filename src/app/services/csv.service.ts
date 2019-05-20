import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class CsvService {

  private readonly basePath = '/api';

  public constructor(private httpClient: HttpClient) {
  }

  public getHeaders(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.basePath}/headers`);
  }

  public getColumnInRange(column: string, ranges: number): Observable<{ data: number[], labels: string[] }> {
    return this.httpClient.get<{ data: number[], labels: string[] }>(`${this.basePath}/plot/distribution/${column}/${ranges}`);
  }

}
