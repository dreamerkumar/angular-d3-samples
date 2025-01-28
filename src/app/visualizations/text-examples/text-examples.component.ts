import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-text-examples',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="visualization-container">
      <h2>Text Rendering Examples</h2>
      
      <!-- Angular Template-driven Text Section -->
      <div class="text-section">
        <h3>Angular Template Text</h3>
        <div class="text-container">
          <!-- Using Angular's *ngFor to iterate and display text -->
          <p class="text-item" *ngFor="let item of textData">
            {{ item }}
          </p>
        </div>
      </div>

      <!-- D3 Data-bound Text Section -->
      <div class="text-section">
        <h3>D3 Data-bound Text</h3>
        <!-- Container for D3 to inject content -->
        <div class="d3-text-container"></div>
      </div>

      <div class="explanation">
        <p class="description">
          Two approaches to rendering text: Angular template syntax and D3 data binding.
        </p>
        <div class="steps">
          <p>Implementation approaches:</p>
          <ul>
            <li>Angular Template:
              <ul>
                <li>Uses *ngFor directive</li>
                <li>Declarative approach</li>
                <li>Direct template binding</li>
              </ul>
            </li>
            <li>D3 Data Binding:
              <ul>
                <li>Uses enter/update/exit pattern</li>
                <li>Programmatic DOM manipulation</li>
                <li>Dynamic data binding</li>
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
    .text-section {
      margin: 20px;
    }
    .text-section h3 {
      margin-bottom: 15px;
      font-size: 18px;
      color: #333;
    }
    .text-container, 
    .d3-text-container {
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 4px;
      background-color: #f8f9fa;
    }
    .text-item {
      margin: 10px 0;
      padding: 8px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .text-item:hover {
      transform: translateX(10px);
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
      font-size: 14px;
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
export class TextExamplesComponent implements OnInit {
  // Sample text data array
  textData: string[] = [
    "Welcome to D3 Text Examples",
    "Learning Data Visualization",
    "Angular + D3.js Integration",
    "Dynamic Data Binding",
    "Interactive Web Graphics"
  ];

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.createD3Text();
  }

  private createD3Text(): void {
    // Select the container div for D3 content
    const container = d3.select(this.el.nativeElement.querySelector('.d3-text-container'));

    // Create paragraph elements for each data item
    const paragraphs = container
      .selectAll('p')                    // Select all paragraphs (initially empty)
      .data(this.textData)               // Bind data array to selection
      .enter()                           // Get enter selection for new elements
      .append('p')                       // Append paragraph for each data item
      .attr('class', 'text-item')        // Add the same class as Angular version
      .text(d => d)                      // Set text content from data
      .on('click', (event, d) => {       // Add click handler
        alert(d);                        // Show alert with text content
      })
      .on('mouseover', function() {      // Add mouseover handler
        d3.select(this)                  // Select hovered element
          .style('color', '#007bff')     // Change text color on hover
          .style('cursor', 'pointer');    // Change cursor to pointer
      })
      .on('mouseout', function() {       // Add mouseout to reset
        d3.select(this)
          .style('color', null);         // Reset text color
      });
  }
} 