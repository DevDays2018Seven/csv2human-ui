import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartType} from 'chart.js';
import {CsvService} from './services/csv.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public headers: string[];

  public attribute = 'price';
  public rangeCount = 4;

  public chartType: ChartType = 'bar';
  public data: number[];
  public labels: string[];

  public ngOnInit(): void {

    this.getData(this.attribute, this.rangeCount).subscribe(
      (value) => {
        this.data = value.data;
        this.labels = value.ranges;
      },
      (error) => {
        console.log(error);
      });

    this.csvService.getHeaders().subscribe(headers => this.headers = headers);
  }

  public constructor(public csvService: CsvService) {
  }

  public getData(attribute: string, rangesCount): Observable<{ data: number[], ranges: string[] }> {

    return of({
      data: [3, 12, 6, 20, 4],
      ranges: ['<10', '10 - 20', '20 - 30', '30 - 40']
    });
  }
}
