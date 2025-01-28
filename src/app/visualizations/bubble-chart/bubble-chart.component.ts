import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Bubble Chart Example</h2>
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
export class BubbleChartComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createBubbleChart();
  }

  private createBubbleChart() {
    // Generate 20 random data points with x, y coordinates and size
    const data = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,     // Random x position
      y: Math.random() * 100,     // Random y position
      size: Math.random() * 1000 + 100  // Random bubble size
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

    // Create X scale
    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    // Create Y scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Create scale for bubble sizes
    const size = d3.scaleLinear()
      .domain([0, 1100])    // Input domain (size values)
      .range([4, 40]);      // Output range (radius in pixels)

    // Create and position the bubbles
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.x))        // X position
      .attr('cy', d => y(d.y))        // Y position
      .attr('r', d => size(d.size))   // Circle radius based on size
      .attr('fill', '#007bff')        // Bubble color
      .attr('opacity', 0.6);          // Transparency

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y));
  }
} 