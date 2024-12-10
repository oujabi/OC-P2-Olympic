import {Participation} from "./Participation";

// Use for type data get with getOlympics() in olympic.service.ts
export interface Olympic {
  id: number,
  country: string,
  participations: Participation[],
}
