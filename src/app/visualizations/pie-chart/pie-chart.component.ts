import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Pie Chart Example</h2>
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
export class PieChartComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createPieChart();
  }

  private createPieChart() {
    // Sample data with labels and values
    const data = [
      { label: 'Category A', value: 30 },
      { label: 'Category B', value: 20 },
      { label: 'Category C', value: 15 },
      { label: 'Category D', value: 25 },
      { label: 'Category E', value: 10 }
    ];

    // Set up chart dimensions
    const container = this.el.nativeElement.querySelector('.chart-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const radius = Math.min(width, height) / 2;  // Use smaller dimension for radius

    // Create color scale for segments
    const color = d3.scaleOrdinal(d3.schemeCategory10);  // D3's built-in color scheme

    // Create SVG container and move center point to middle
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);  // Center the pie

    // Create pie layout generator
    const pie = d3.pie<any>()
      .value(d => d.value);  // Use 'value' property for segment size

    // Create arc generator for segments
    const arc = d3.arc()
      .innerRadius(0)         // Start from center (pie, not donut)
      .outerRadius(radius - 40);  // Leave space for labels

    // Create segment groups
    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g');

    // Add paths for each segment
    arcs.append('path')
      .attr('d', arc as any)
      .attr('fill', (d, i) => color(i.toString()));  // Color each segment

    // Add text labels
    arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)  // Position at arc center
      .attr('text-anchor', 'middle')
      .text(d => d.data.label);
  }
} 