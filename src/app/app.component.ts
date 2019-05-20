import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
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

  public data: number[] = [];
  public labels: string[] = [];

  public selectedHeader;

  public constructor(public csvService: CsvService) {
  }

  public ngOnInit(): void {
    this.fetchData(this.attribute, this.rangeCount);

    this.csvService.getHeaders().subscribe(headers => this.headers = headers);
  }

  public setHeader(): void {
    this.fetchData(this.selectedHeader, this.rangeCount);
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
  }
}
