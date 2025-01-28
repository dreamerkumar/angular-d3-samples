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
      <div class="explanation">
        <p class="description">
          A force-directed graph showing relationships between nodes with physics simulation.
        </p>
        <div class="steps">
          <p>Implementation steps:</p>
          <ul>
            <li>Network structure:
              <ul>
                <li>Nodes represent entities</li>
                <li>Links show connections between nodes</li>
                <li>Node groups indicated by colors</li>
              </ul>
            </li>
            <li>Force simulation physics:
              <ul>
                <li>Link forces keep connected nodes together</li>
                <li>Charge forces make nodes repel each other</li>
                <li>Center force pulls nodes toward center</li>
              </ul>
            </li>
            <li>Interactive features:
              <ul>
                <li>Drag nodes to reposition</li>
                <li>Physics simulation adjusts other nodes</li>
                <li>Hover shows node details</li>
              </ul>
            </li>
            <li>Visual properties:
              <ul>
                <li>Node size shows importance</li>
                <li>Link thickness shows connection strength</li>
                <li>Colors distinguish node groups</li>
              </ul>
            </li>
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
export class ForceDirectedComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createForceDirectedGraph();
  }

  private createForceDirectedGraph() {
    // Sample data structure with nodes and links representing a network
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

    // Get the container dimensions for the visualization
    const container = this.el.nativeElement.querySelector('.chart-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create a color scale that maps group numbers to different colors
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Initialize the force simulation
    // This is the physics engine that will move the nodes around
    const simulation = d3.forceSimulation<Node>(data.nodes)
      // Add forces:
      // - link force keeps connected nodes together
      .force('link', d3.forceLink(data.links).id((d: any) => d.id))
      // - charge force makes nodes repel each other
      .force('charge', d3.forceManyBody().strength(-100))
      // - center force pulls nodes toward center
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create the SVG container for the visualization
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Create the links (lines) between nodes
    const link = svg.append('g')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')  // Gray color for links
      .attr('stroke-opacity', 0.6)  // Semi-transparent
      .attr('stroke-width', d => Math.sqrt(d.value));  // Link thickness based on value

    // Create the nodes (circles)
    const node = svg.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 8)  // Circle radius
      .attr('fill', (d: any) => color(d.group.toString()))  // Color based on group
      // Add drag behavior to nodes
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add tooltips showing node IDs
    node.append('title')
      .text((d: any) => d.id);

    // Update node and link positions on each simulation tick
    simulation.on('tick', () => {
      // Update link positions to connect their source and target nodes
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      // Update node positions
      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
    });

    // Drag event handlers
    function dragstarted(event: any) {
      // Restart simulation if it's cooled down
      if (!event.active) simulation.alphaTarget(0.3).restart();
      // Fix node position during drag
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      // Update node position during drag
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      // Cool down simulation when drag ends
      if (!event.active) simulation.alphaTarget(0);
      // Release node position
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }
} 