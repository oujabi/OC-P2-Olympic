import {ChartDTO} from "./ChartDTO";

//DTO use for send data in LineChart
export interface LineChartDTO {
  name: string;
  series: ChartDTO[];
}
