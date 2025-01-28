import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { hierarchy } from 'd3';

interface TreeMapData {
  name: string;
  children: { name: string; value: number; }[];
}

interface TreeMapNode extends d3.HierarchyNode<TreeMapData> {
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
}

@Component({
  selector: 'app-tree-map',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Tree Map Example</h2>
      <div class="chart-container"></div>
      <div class="explanation">
        <p class="description">
          A treemap showing hierarchical data through nested rectangles.
        </p>
        <div class="steps">
          <p>Implementation steps:</p>
          <ul>
            <li>Hierarchical data displayed as nested rectangles</li>
            <li>Rectangle size proportional to data value</li>
            <li>Key D3 functions used:
              <ul>
                <li>d3.hierarchy() processes tree structure</li>
                <li>d3.treemap() computes layout</li>
                <li>Rectangle dimensions from x0,y0,x1,y1</li>
              </ul>
            </li>
            <li>Colors distinguish different categories</li>
            <li>Labels show category names inside rectangles</li>
            <li>Useful for showing part-to-whole relationships</li>
            <li>Efficient use of space for hierarchical data</li>
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
    .steps li ul {
      margin-top: 2px;
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
      .data<TreeMapNode>(root.leaves())
      .enter().append('g')
      .attr('transform', (d: TreeMapNode) => `translate(${d.x0},${d.y0})`);

    cell.append('rect')
      .attr('width', (d: TreeMapNode) => (d.x1 ?? 0) - (d.x0 ?? 0))
      .attr('height', (d: TreeMapNode) => (d.y1 ?? 0) - (d.y0 ?? 0))
      .attr('fill', (d, i) => color(i.toString()));

    cell.append('text')
      .attr('x', 5)
      .attr('y', 20)
      .text(d => d.data.name)
      .attr('font-size', '12px')
      .attr('fill', 'white');
  }
} 