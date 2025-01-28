import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  visualizations = [
    { path: '/bar-chart', label: 'Bar Chart' },
    { path: '/line-chart', label: 'Line Chart' },
    { path: '/pie-chart', label: 'Pie Chart' },
    { path: '/scatter-plot', label: 'Scatter Plot' },
    { path: '/bubble-chart', label: 'Bubble Chart' },
    { path: '/donut-chart', label: 'Donut Chart' },
    { path: '/area-chart', label: 'Area Chart' },
    { path: '/tree-map', label: 'Tree Map' },
    { path: '/radar-chart', label: 'Radar Chart' },
    { path: '/force-directed', label: 'Force Directed Graph' },
    { path: '/circle-examples', label: 'Circle Examples' }
  ];
}
