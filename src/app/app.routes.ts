import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'bar-chart', pathMatch: 'full' },
  { path: 'bar-chart', loadComponent: () => import('./visualizations/bar-chart/bar-chart.component').then(m => m.BarChartComponent) },
  { path: 'line-chart', loadComponent: () => import('./visualizations/line-chart/line-chart.component').then(m => m.LineChartComponent) },
  { path: 'pie-chart', loadComponent: () => import('./visualizations/pie-chart/pie-chart.component').then(m => m.PieChartComponent) },
  { path: 'scatter-plot', loadComponent: () => import('./visualizations/scatter-plot/scatter-plot.component').then(m => m.ScatterPlotComponent) },
  { path: 'bubble-chart', loadComponent: () => import('./visualizations/bubble-chart/bubble-chart.component').then(m => m.BubbleChartComponent) },
  { path: 'donut-chart', loadComponent: () => import('./visualizations/donut-chart/donut-chart.component').then(m => m.DonutChartComponent) },
  { path: 'area-chart', loadComponent: () => import('./visualizations/area-chart/area-chart.component').then(m => m.AreaChartComponent) },
  { path: 'tree-map', loadComponent: () => import('./visualizations/tree-map/tree-map.component').then(m => m.TreeMapComponent) },
  { path: 'radar-chart', loadComponent: () => import('./visualizations/radar-chart/radar-chart.component').then(m => m.RadarChartComponent) },
  { path: 'force-directed', loadComponent: () => import('./visualizations/force-directed/force-directed.component').then(m => m.ForceDirectedComponent) },
  { path: 'circle-examples', loadComponent: () => import('./visualizations/circle-examples/circle-examples.component').then(m => m.CircleExamplesComponent) }
];
