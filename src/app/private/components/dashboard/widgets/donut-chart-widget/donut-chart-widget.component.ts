import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import defaultsDeep from 'lodash-es/defaultsDeep';
import { defaultChartOptions } from '@template/shared/chart-widget/chart-widget-defaults';
import { ChartWidgetOptions } from '@template/shared/chart-widget/chart-widget-options.interface';

@Component({
  selector: 'template-donut-chart-widget',
  templateUrl: './donut-chart-widget.component.html',
  styleUrls: ['./donut-chart-widget.component.scss'],
})
export class DonutChartWidgetComponent {
  @Input() data!: ChartData;
  @Input() options!: ChartWidgetOptions;
  @Input() chartOptions: ChartOptions = defaultsDeep(
    {
      layout: {
        padding: {
          left: 5,
          right: 5,
          top: 5,
        },
      },
      pieceLabel: {
        render: 'label',
        arc: true,
        position: 'border',
        fontColor: '#FFFFFF',
      },
    },
    defaultChartOptions
  );
  @Input() chartPlugins = [];

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas!: ElementRef;

  chart!: Chart;

  isLoading!: boolean;

  constructor() {}

  reload() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
