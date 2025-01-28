import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Bar Chart Example</h2>
      <div class="chart-container"></div>
      <div class="explanation">
        <p class="description">
          A simple bar chart showing categorical data with vertical bars.
        </p>
        <div class="steps">
          <p>Implementation steps:</p>
          <ul>
            <li>Data represents categories (A-E) with corresponding values</li>
            <li>Each bar height represents the value for that category</li>
            <li>Bars are evenly spaced using d3.scaleBand</li>
            <li>Height is scaled using d3.scaleLinear</li>
            <li>Interactive hover effects show exact values</li>
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
export class BarChartComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createBarChart();
  }

  private createBarChart() {
    // Sample data with categories and values
    const data = [
      { label: 'A', value: 10 },
      { label: 'B', value: 20 },
      { label: 'C', value: 30 },
      { label: 'D', value: 40 },
      { label: 'E', value: 50 },
    ];

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

    // Create X scale (band scale for categorical data)
    const x = d3.scaleBand()
      .range([0, width])     // Output range
      .padding(0.1);         // Add padding between bars

    // Create Y scale (linear for values)
    const y = d3.scaleLinear()
      .range([height, 0]);   // Output range (inverted for SVG)

    // Set domains for scales
    x.domain(data.map(d => d.label));              // Set categories
    y.domain([0, d3.max(data, d => d.value)!]);    // Set value range

    // Create and add the bars
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label)!)     // X position
      .attr('width', x.bandwidth())     // Bar width
      .attr('y', d => y(d.value))      // Y position (top of bar)
      .attr('height', d => height - y(d.value))  // Bar height
      .attr('fill', '#007bff');        // Bar color

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));
  }
} 