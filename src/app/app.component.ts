import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('chart')
  public canvas: ElementRef;

  public chart: Chart = null;

  public context: CanvasRenderingContext2D;

  public ngOnInit(): void {
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');

    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3]
        }]
      }
    });
  }
}
