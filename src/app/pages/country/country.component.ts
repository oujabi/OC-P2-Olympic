import {Component, Input, OnInit} from '@angular/core';
import {LineChartComponent} from "../../charts/line-chart/line-chart.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    LineChartComponent,
    RouterLink
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  countryId !: number;
  constructor(
    private route : ActivatedRoute,
    private olympicService : OlympicService,
    private router : Router,) {
  }

  ngOnInit() {
    this.countryId = this.route.snapshot.params['countryId'];
  }
}
