import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circle-examples',
  standalone: true,
  template: `
    <div class="visualization-container">
      <h2>Circle Examples</h2>
      <div class="circles-container">
        <div class="circle-section">
          <h3>Pure SVG Circle</h3>
          <svg width="200" height="200">
            <circle 
              cx="100" 
              cy="100" 
              r="50" 
              fill="#007bff"
              opacity="0.7">
            </circle>
          </svg>
        </div>

        <div class="circle-section">
          <h3>D3 Single Circle</h3>
          <div class="d3-circle-container"></div>
        </div>

        <div class="circle-section">
          <h3>D3 Data-Bound Circles</h3>
          <div class="d3-data-circles-container"></div>
        </div>
      </div>
      
      <div class="explanation">
        <p class="description">
          Three approaches to drawing circles: pure SVG, D3 direct manipulation, and D3 data binding.
        </p>
        <div class="steps">
          <p>Implementation approaches:</p>
          <ul>
            <li>Pure SVG:
              <ul>
                <li>Direct SVG markup in template</li>
                <li>Static circle properties</li>
                <li>No JavaScript required</li>
              </ul>
            </li>
            <li>D3 Single Circle:
              <ul>
                <li>D3 selection and append</li>
                <li>Programmatic circle creation</li>
                <li>Manual attribute setting</li>
              </ul>
            </li>
            <li>D3 Data-Bound:
              <ul>
                <li>Data array drives circle creation</li>
                <li>Enter/Update/Exit pattern</li>
                <li>Dynamic attributes from data</li>
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
    .circles-container {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin: 20px 0;
    }
    .circle-section {
      text-align: center;
      margin: 10px;
    }
    .circle-section h3 {
      margin-bottom: 10px;
      font-size: 16px;
      color: #333;
    }
    .d3-circle-container,
    .d3-data-circles-container {
      width: 200px;
      height: 200px;
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
export class CircleExamplesComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createD3Circle();
    this.createDataBoundCircles();
  }

  private createD3Circle(): void {
    // Create SVG container
    const svg = d3.select(this.el.nativeElement.querySelector('.d3-circle-container'))
      .append('svg')
      .attr('width', 200)
      .attr('height', 200);

    // Add single circle using D3
    svg.append('circle')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 50)
      .attr('fill', '#28a745')
      .attr('opacity', 0.7);
  }

  private createDataBoundCircles(): void {
    // Sample data array for multiple circles
    const data = [
      { x: 60, y: 100, radius: 30 },
      { x: 140, y: 100, radius: 30 },
      { x: 100, y: 100, radius: 40 }
    ];

    // Create SVG container
    const svg = d3.select(this.el.nativeElement.querySelector('.d3-data-circles-container'))
      .append('svg')
      .attr('width', 200)
      .attr('height', 200);

    // Add circles using data binding
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.radius)
      .attr('fill', '#dc3545')
      .attr('opacity', 0.7);
  }
} 