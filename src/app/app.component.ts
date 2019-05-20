<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { CsvService } from './services/csv.service';
=======
import {Component, OnInit} from '@angular/core';
import {Chart, ChartDataSets} from 'chart.js';
import {CsvService} from './services/csv.service';
>>>>>>> d56e53fdf72689dc3908132d2b3a9856b0369473

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public headers: string[];

  public attribute = 'review.point';

  public rangeCount = 10;

<<<<<<< HEAD
  public data: number[] = [];

  public labels: string[] = [];
=======
  public data: number[] = [1];
  public labels: string[] = [''];

  public scatterDataColumn1 = 'price';
  public scatterDataColumn2 = 'review.point';
  public scatterData: ChartDataSets[] = [{
    data: [{x: 0, y: 0}],
    label: 'Serie A'
  }];
  public scatterLabels: string[] = ['A'];
>>>>>>> d56e53fdf72689dc3908132d2b3a9856b0369473

  public ranges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  public csvs: string[];

  public selectedHeader = this.attribute;

  public selectedRangeWidth = this.rangeCount;

  public selectedCsv;

  public outlier = false;

  public constructor(public csvService: CsvService) {
  }

  public ngOnInit(): void {
    // this.fetchCsvs();
    this.fetchData(this.attribute, this.rangeCount);

    this.csvService.getHeaders().subscribe(headers => this.headers = headers);
  }

  public updatePlot(): void {
    this.fetchData(this.selectedHeader, this.selectedRangeWidth);
  }

  private fetchCsvs(): void {
    this.csvService.fetchCsvs().subscribe(
      value => {
        this.csvs = value;
        this.selectedCsv = value[0];
      }, console.error);
  }

  private fetchData(attribute: string, rangeCount: number): void {
    this.csvService.getColumnInRange(attribute, rangeCount, this.outlier).subscribe(
      value => {
        this.data = value.data;
        this.labels = value.labels;
<<<<<<< HEAD
      }, console.error);
=======
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
>>>>>>> d56e53fdf72689dc3908132d2b3a9856b0369473
  }
}
