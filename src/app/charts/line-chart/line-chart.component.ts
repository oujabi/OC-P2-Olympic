import {Component, Input, OnInit} from '@angular/core';
import {Color, LineChartModule, ScaleType} from "@swimlane/ngx-charts";
import * as DummyData from "../../data";
import {OlympicService} from "../../core/services/olympic.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    LineChartModule
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  @Input() countryId: number = 0;
  data: any[] = DummyData.annualWageSalary;
  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = false;
  scheme: Color = {
    name: 'scheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private location: Location) {}

  ngOnInit(): void {
    this.olympicService.getLineChartOlympics(this.countryId).subscribe(d => {
      this.data = d;
    });
  }

  onSelect(data: string): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: string): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: string): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
