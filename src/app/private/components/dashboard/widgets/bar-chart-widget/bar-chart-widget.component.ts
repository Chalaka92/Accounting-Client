import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import defaultsDeep from 'lodash-es/defaultsDeep';
import { defaultChartOptions } from '@template/shared/chart-widget/chart-widget-defaults';
import { BarChartWidgetOptions } from './bar-chart-widget-options.interface';

@Component({
  selector: 'template-bar-chart-widget',
  templateUrl: './bar-chart-widget.component.html',
  styleUrls: ['./bar-chart-widget.component.scss'],
})
export class BarChartWidgetComponent {
  @Input() data: ChartData | any;
  @Input() options: BarChartWidgetOptions | any;
  @Input() chartOptions: ChartOptions = defaultsDeep(
    {
      layout: {
        padding: {
          left: 24,
          right: 24,
          top: 16,
          bottom: 24,
        },
      },
      scales: {
        x: {
          barPercentage: 0.5,
        },
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        intersect: true,
      },
    },

    defaultChartOptions
  );

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  chart: Chart;

  isLoading: boolean;

  constructor() {}

  reload() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
