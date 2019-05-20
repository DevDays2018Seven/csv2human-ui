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

  public getScatterValues(column1: string, column2: string): Observable<{ data: { x: number, y: number }[] }> {
    return this.httpClient.get<{ data: { x: number, y: number }[] }>(`/api/plot/scatter/${column1}/${column2}`);
  }

}
