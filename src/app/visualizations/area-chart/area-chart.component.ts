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
    // Generate sample data: 20 days with random values
    const data = Array.from({ length: 20 }, (_, i) => ({
      date: new Date(2024, 0, i + 1),  // Sequential dates starting Jan 1, 2024
      value: Math.random() * 100        // Random values between 0-100
    }));

    // Set up margins and dimensions
    const container = this.el.nativeElement.querySelector('.chart-container');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;

    // Create SVG container with margins
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create X scale (time scale for dates)
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])  // Min to max dates
      .range([0, width]);

    // Create Y scale (linear for values)
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])  // 0 to max value
      .range([height, 0]);

    // Create area generator
    const area = d3.area<{ date: Date; value: number }>()
      .x(d => x(d.date))     // X coordinate from date
      .y0(height)            // Bottom of area (baseline)
      .y1(d => y(d.value));  // Top of area from values

    // Add the area path
    svg.append('path')
      .datum(data)
      .attr('fill', '#007bff')         // Fill color
      .attr('fill-opacity', 0.3)       // Semi-transparent fill
      .attr('stroke', '#007bff')       // Line color
      .attr('stroke-width', 1.5)       // Line thickness
      .attr('d', area);                // Generate area shape

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));
  }
} 