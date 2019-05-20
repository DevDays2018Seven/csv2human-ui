import {Component, OnInit} from '@angular/core';
import {Chart, ChartDataSets} from 'chart.js';
import {CsvService} from './services/csv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public headers: string[];

  public attribute = 'review.point';
  public rangeCount = 10;

  public data: number[] = [1];
  public labels: string[] = [''];

  public scatterDataColumn1 = 'price';
  public scatterDataColumn2 = 'review.point';
  public scatterData: ChartDataSets[] = [{
    data: [{x: 0, y: 0}],
    label: 'Serie A'
  }];
  public scatterLabels: string[] = ['A'];

  public ranges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  public selectedHeader = this.attribute;
  public selectedRangeWidth = this.rangeCount;

  public constructor(public csvService: CsvService) {
  }

  public ngOnInit(): void {
    this.fetchData(this.attribute, this.rangeCount);

    this.csvService.getHeaders().subscribe(headers => this.headers = headers);
  }

  public updatePlot(): void {
    this.fetchData(this.selectedHeader, this.selectedRangeWidth);
  }

  private fetchData(attribute: string, rangeCount: number): void {
    this.csvService.getColumnInRange(attribute, rangeCount).subscribe(
      (value) => {
        this.data = value.data;
        this.labels = value.labels;
      },
      (error) => {
        console.log(error);
      });

    this.csvService.getScatterValues(this.scatterDataColumn1, this.scatterDataColumn2).subscribe(
      (value) => {
        this.scatterData[0].data = value.data;
      },
      (error) => {
        console.log(error);
      });

    this.csvService.getHeaders().subscribe(headers => this.headers = headers);
  }
}
