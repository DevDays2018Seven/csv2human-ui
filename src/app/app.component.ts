import {Component, OnInit} from '@angular/core';
import {Chart, ChartDataSets} from 'chart.js';
import {CsvService} from './services/csv.service';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public headers: string[];

  public attribute;

  public rangeCount = 10;

  public data: number[] = [];

  public labels: string[] = [];

  public scatterDataColumn1;
  public scatterDataColumn2;
  public scatterData: ChartDataSets[] = [{
    data: [{x: 0, y: 0}],
    label: 'Serie A'
  }];
  public scatterLabels: string[] = ['A'];

  public ranges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  public csvs: string[];

  public selectedHeader = this.attribute;

  public selectedRangeWidth = this.rangeCount;

  public selectedCsv;

  public outlier = false;

  public selectedScatterX = this.scatterDataColumn1;
  public selectedScatterY = this.scatterDataColumn2;
  public scatterOutlier = false;

  public constructor(public csvService: CsvService) {
  }

  public ngOnInit(): void {
    this.fetchCsvs();

    this.fetchAll();
  }

  private fetchAll(): void {
    this.csvService.getHeaders().subscribe(headers => {
      this.headers = headers;

      this.attribute = this.headers[0];
      this.selectedHeader = this.attribute;
      this.scatterDataColumn1 = this.headers[0];
      this.scatterDataColumn2 = this.headers[0];
      this.selectedScatterX = this.scatterDataColumn1;
      this.selectedScatterY = this.scatterDataColumn2;

      this.fetchData(this.attribute, this.rangeCount);

      this.fetchScatterData(this.scatterDataColumn1, this.scatterDataColumn2);
    });
  }

  public updatePlot(): void {
    this.fetchData(this.selectedHeader, this.selectedRangeWidth);
  }

  public updateScatterPlot(): void {
    this.fetchScatterData(this.selectedScatterX, this.selectedScatterY);
  }

  public selectCsv(): void {
    this.csvService.setCsv(this.selectedCsv).subscribe(
      _ => {
        this.fetchAll();
      }, console.error);
  }

  private fetchCsvs(): void {
    this.csvService.fetchCsvs().subscribe(
      value => {
        this.csvs = value;
        this.selectedCsv = value[0];
      }, console.error);
  }

  private fetchData(attribute: string, rangeCount: number): void {
    this.csvService.getColumnInRange(attribute, rangeCount, this.outlier)
      .pipe(take(1))
      .subscribe(
      value => {
        this.data = value.data;
        this.labels = value.labels;
      }, console.error);
  }

  private fetchScatterData(col1: string, col2: string): void {
    this.csvService.getScatterValues(col1, col2, this.scatterOutlier)
      .pipe(take(1))
      .subscribe(
      (value) => {
        this.scatterData[0].data = [];
        this.scatterData[0].data = value.data;
      },
      (error) => {
        console.log(error);
      });
  }
}
