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

  public attribute = 'price';
  public rangeCount = 10;

  public data: number[] = [];
  public labels: string[] = [];

  public constructor(public csvService: CsvService) {
  }

  public ngOnInit(): void {
    this.csvService.getColumnInRange(this.attribute, this.rangeCount).subscribe(
      (value) => {
        this.data = value.data;
        this.labels = value.labels;
      },
      (error) => {
        console.log(error);
      });

    this.csvService.getHeaders().subscribe(headers => this.headers = headers);
  }
}
