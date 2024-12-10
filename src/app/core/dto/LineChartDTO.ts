import {BasicDTO} from "./BasicDTO";

//DTO use for send data in LineChart
export interface LineChartDTO {
  name: string;
  series: BasicDTO[];
}
