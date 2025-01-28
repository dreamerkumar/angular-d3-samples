import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter-plot',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Scatter Plot Example</h2>
      <div class="chart-container"></div>
      <div class="explanation">
        <p class="description">
          A scatter plot showing the relationship between two variables as points in 2D space.
        </p>
        <div class="steps">
          <p>Implementation steps:</p>
          <ul>
            <li>Each point represents an X,Y coordinate pair</li>
            <li>X and Y scales map data values to pixel positions</li>
            <li>Points are rendered as SVG circles</li>
            <li>Axes show the range of values</li>
            <li>Point positions reveal patterns and correlations</li>
            <li>Random data used here, but typically shows real relationships</li>
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
export class ScatterPlotComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createScatterPlot();
  }

  private createScatterPlot() {
    // Generate 50 random data points with x,y coordinates
    const data = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,  // Random x between 0-100
      y: Math.random() * 100   // Random y between 0-100
    }));

    // Set up margins and dimensions
    const container = this.el.nativeElement.querySelector('.chart-container');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    // Calculate actual plotting area dimensions
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;

    // Create SVG container with margins
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create X scale (linear, from 0-100)
    const x = d3.scaleLinear()
      .domain([0, 100])  // Input domain
      .range([0, width]);  // Output range in pixels

    // Create Y scale (linear, from 0-100)
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);  // Inverted for SVG coordinates

    // Create and position the scatter plot points
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.x))  // X position
      .attr('cy', d => y(d.y))  // Y position
      .attr('r', 5)             // Circle radius
      .attr('fill', '#007bff'); // Circle color

    // Add X axis at bottom
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis at left
    svg.append('g')
      .call(d3.axisLeft(y));
  }
} 