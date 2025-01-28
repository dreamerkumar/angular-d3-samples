import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Line Chart Example</h2>
      <div class="chart-container"></div>
      <div class="explanation">
        <p class="description">
          A line chart showing data trends over time with connected points.
        </p>
        <div class="steps">
          <p>Implementation steps:</p>
          <ul>
            <li>Data points represent values over time</li>
            <li>Points are connected using d3.line() generator</li>
            <li>X-axis uses time scale (d3.scaleTime)</li>
            <li>Y-axis uses linear scale for values</li>
            <li>Smooth line transitions between points</li>
          </ul>
        </div>
      </div>
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
    .explanation {
      margin-top: 20px;
      padding: 0 20px;
    }
    .description {
      font-size: 14px;
      text-align: center;
      margin-bottom: 15px;
    }
    .steps {
      font-size: 12px;
    }
    .steps ul {
      margin-top: 5px;
      padding-left: 25px;
    }
    .steps li {
      margin: 5px 0;
    }
  `]
})
export class LineChartComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createLineChart();
  }

  private createLineChart() {
    // Generate sample data: 20 data points with dates and random values
    const data = Array.from({ length: 20 }, (_, i) => ({
      date: new Date(2024, 0, i + 1),  // Creates dates starting from Jan 1, 2024
      value: Math.random() * 100        // Random values between 0 and 100
    }));

    // Set up chart dimensions with margins for axes
    const container = this.el.nativeElement.querySelector('.chart-container');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    // Calculate actual chart area by subtracting margins
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;

    // Create the SVG container with proper dimensions and margins
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      // Create a group element for the chart and translate it to account for margins
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create X scale (time scale for dates)
    const x = d3.scaleTime()
      // Set domain from min to max dates in the data
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      // Map to pixel range from 0 to width
      .range([0, width]);

    // Create Y scale (linear scale for values)
    const y = d3.scaleLinear()
      // Set domain from 0 to max value in data
      .domain([0, d3.max(data, d => d.value)!])
      // Map to pixel range from height to 0 (SVG coordinates start at top)
      .range([height, 0]);

    // Create the line generator function
    const line = d3.line<{ date: Date; value: number }>()
      .x(d => x(d.date))    // X coordinate from date
      .y(d => y(d.value));  // Y coordinate from value

    // Add the line path to the SVG
    svg.append('path')
      .datum(data)          // Bind data to single path element
      .attr('fill', 'none') // Line should have no fill
      .attr('stroke', '#007bff')     // Blue line color
      .attr('stroke-width', 2)       // Line thickness
      .attr('d', line);    // Generate path data using line generator

    // Add X axis at the bottom of the chart
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis at the left of the chart
    svg.append('g')
      .call(d3.axisLeft(y));
  }
} 