import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

@Component({
  selector: 'app-force-directed',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Force Directed Graph Example</h2>
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
export class ForceDirectedComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createForceDirectedGraph();
  }

  private createForceDirectedGraph() {
    const data = {
      nodes: [
        { id: 'A', group: 1 },
        { id: 'B', group: 1 },
        { id: 'C', group: 2 },
        { id: 'D', group: 2 },
        { id: 'E', group: 3 },
        { id: 'F', group: 3 },
        { id: 'G', group: 3 }
      ],
      links: [
        { source: 'A', target: 'B', value: 1 },
        { source: 'B', target: 'C', value: 1 },
        { source: 'C', target: 'D', value: 1 },
        { source: 'D', target: 'E', value: 1 },
        { source: 'E', target: 'F', value: 1 },
        { source: 'F', target: 'G', value: 1 },
        { source: 'G', target: 'A', value: 1 }
      ]
    };

    const container = this.el.nativeElement.querySelector('.chart-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation<Node>(data.nodes)
      .force('link', d3.forceLink(data.links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const link = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('fill', (d: any) => color(d.group.toString()))
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('title')
      .text((d: any) => d.id);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }
} 