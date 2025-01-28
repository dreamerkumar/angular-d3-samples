import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Area Chart Example</h2>
      <div class="chart-container"></div>
    </div>
  `,
  styles: [`
    .visualization-container {
      padding: 20px;
    }
    .chart-container {
      width: 100%;
      height: 400px;
    }
  `]
})
export class AreaChartComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createAreaChart();
  }

  private createAreaChart() {
    const data = Array.from({ length: 20 }, (_, i) => ({
      date: new Date(2024, 0, i + 1),
      value: Math.random() * 100
    }));

    const container = this.el.nativeElement.querySelector('.chart-container');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .range([height, 0]);

    const area = d3.area<{ date: Date; value: number }>()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.value));

    svg.append('path')
      .datum(data)
      .attr('fill', '#007bff')
      .attr('fill-opacity', 0.3)
      .attr('stroke', '#007bff')
      .attr('stroke-width', 1.5)
      .attr('d', area);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }
} 