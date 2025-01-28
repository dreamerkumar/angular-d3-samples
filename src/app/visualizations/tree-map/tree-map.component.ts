import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { hierarchy } from 'd3';

interface TreeMapData {
  name: string;
  children: { name: string; value: number; }[];
}

@Component({
  selector: 'app-tree-map',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Tree Map Example</h2>
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
export class TreeMapComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createTreeMap();
  }

  private createTreeMap(): void {
    const data = {
      name: 'root',
      children: [
        { name: 'Category A', value: 30 },
        { name: 'Category B', value: 20 },
        { name: 'Category C', value: 15 },
        { name: 'Category D', value: 25 },
        { name: 'Category E', value: 10 }
      ]
    };

    const container = this.el.nativeElement.querySelector('.chart-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const root = hierarchy<TreeMapData>(data)
      .sum(d => {
        if ('value' in d) {
          return (d as { value: number }).value;
        }
        return 0;
      });

    const treemap = d3.treemap<TreeMapData>()
      .size([width, height])
      .padding(1);

    treemap(root);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const cell = svg.selectAll('g')
      .data(root.leaves())
      .enter().append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', (d, i) => color(i.toString()));

    cell.append('text')
      .attr('x', 5)
      .attr('y', 20)
      .text(d => d.data.name)
      .attr('font-size', '12px')
      .attr('fill', 'white');
  }
} 