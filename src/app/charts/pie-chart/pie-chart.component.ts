import {Component, OnInit} from '@angular/core';
import {PieChartModule} from "@swimlane/ngx-charts";
import * as DummyData from "../../data";
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";
import {OlympicService} from "../../core/services/olympic.service";
import {Country} from "../../models/Country";
import {Observable, of} from "rxjs";
import {map} from "d3";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    PieChartModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  data3 :{name: string, value: number}[] = [];
  data  = DummyData.totalPopulation;
  view: [number, number] = [700, 400];

  // Options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme: Color = {
    name: 'scheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }

  animation = true;
  labels = true;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }

  percentageFormatter(data: any): string {
    return data.value + "%";
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
