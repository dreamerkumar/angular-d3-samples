import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Donut Chart Example</h2>
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
export class DonutChartComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createDonutChart();
  }

  private createDonutChart() {
    const data = [
      { label: 'Category A', value: 30 },
      { label: 'Category B', value: 20 },
      { label: 'Category C', value: 15 },
      { label: 'Category D', value: 25 },
      { label: 'Category E', value: 10 }
    ];

    const container = this.el.nativeElement.querySelector('.chart-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const arc = d3.arc()
      .innerRadius(radius * 0.6) // This makes it a donut chart
      .outerRadius(radius - 40);

    const pie = d3.pie<any>()
      .value(d => d.value);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g');

    arcs.append('path')
      .attr('d', arc as any)
      .attr('fill', (d, i) => color(i.toString()));

    // Add labels
    arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.label);
  }
} 