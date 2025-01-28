import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Radar Chart Example</h2>
      <div class="chart-container"></div>
      <div class="explanation">
        <p class="description">
          A radar chart showing multiple variables on radial axes from a central point.
        </p>
        <div class="steps">
          <p>Implementation steps:</p>
          <ul>
            <li>Each axis represents a different variable</li>
            <li>Values plotted from center (0) to edge (max)</li>
            <li>Points connected to form polygon shape</li>
            <li>Key components:
              <ul>
                <li>Radial axes for each metric</li>
                <li>Circular grid lines show scale</li>
                <li>Filled polygon shows data area</li>
              </ul>
            </li>
            <li>Useful for comparing multiple metrics simultaneously</li>
            <li>Good for showing relative strengths/weaknesses</li>
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
export class RadarChartComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createRadarChart();
  }

  private createRadarChart() {
    const data = [
      { axis: 'Strength', value: 0.8 },
      { axis: 'Speed', value: 0.6 },
      { axis: 'Agility', value: 0.7 },
      { axis: 'Intelligence', value: 0.9 },
      { axis: 'Stamina', value: 0.5 }
    ];

    const container = this.el.nativeElement.querySelector('.chart-container');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const radius = Math.min(width, height) / 2;

    const angleSlice = (Math.PI * 2) / data.length;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

    // Create scales
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 1]);

    // Draw the circular grid
    const levels = 5;
    const gridCircles = svg.selectAll('.gridCircle')
      .data(d3.range(1, levels + 1).reverse())
      .enter()
      .append('circle')
      .attr('r', (d, i) => radius * d / levels)
      .attr('fill', 'none')
      .attr('stroke', '#CDCDCD')
      .attr('stroke-width', '0.5px');

    // Draw the axes
    const axes = svg.selectAll('.axis')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'axis');

    axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => rScale(1.1) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y2', (d, i) => rScale(1.1) * Math.sin(angleSlice * i - Math.PI/2))
      .attr('stroke', '#CDCDCD')
      .attr('stroke-width', '1px');

    // Draw the path
    const radarLine = d3.lineRadial<{ axis: string; value: number }>()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    svg.append('path')
      .datum(data)
      .attr('d', radarLine as any)
      .attr('stroke', '#007bff')
      .attr('stroke-width', '2px')
      .attr('fill', '#007bff')
      .attr('fill-opacity', 0.3);

    // Add labels
    axes.append('text')
      .attr('x', (d, i) => rScale(1.2) * Math.cos(angleSlice * i - Math.PI/2))
      .attr('y', (d, i) => rScale(1.2) * Math.sin(angleSlice * i - Math.PI/2))
      .attr('text-anchor', 'middle')
      .text(d => d.axis);
  }
} 