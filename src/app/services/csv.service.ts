import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class CsvService {

  private readonly basePath = '/api';

  public constructor(private httpClient: HttpClient) {
  }

  public fetchCsvs(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.basePath}/csv`);
  }

  public setCsv(name: string): Observable<void> {
    return this.httpClient.post<void>(`${this.basePath}/csv/${name}`, null);
  }

  public getHeaders(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.basePath}/headers`);
  }

  public getColumnInRange(column: string, ranges: number, outlier: boolean = false): Observable<{ data: number[], labels: string[] }> {
    return this.httpClient.get<{ data: number[], labels: string[] }>(`${this.basePath}/plot/distribution/${column}/${ranges}${outlier ? '?outlier=dixon-q' : ''}`);
  }

}
