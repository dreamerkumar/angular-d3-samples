import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Line Chart Example</h2>
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
export class LineChartComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createLineChart();
  }

  private createLineChart() {
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

    const line = d3.line<{ date: Date; value: number }>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#007bff')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }
} 