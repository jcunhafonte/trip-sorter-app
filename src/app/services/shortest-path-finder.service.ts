import {Injectable} from '@angular/core';
import {Deal} from '../models/deal.model';
import {SortingEnum} from '../enums/sorting.enum';
import {MinPriorityQueue} from '../helpers/min-priority-queue.helper';

interface DijkstraResult {
  prev: string[];
  referenceDealMap: string[];
}

@Injectable()
export class ShortestPathFinderService {
  search(deals: Deal[], dealReferenceMap: Map<string, Deal>[], sorting: SortingEnum, from: string, to: string): Deal[] {
    return this.find(deals, dealReferenceMap, sorting, from, to);
  }

  find(deals: Deal[], dealReferenceMap: Map<string, Deal>[], sorting: SortingEnum, source: string, destination: string): Deal[] {
    const adjacencyMatrix = this.getAdjacencyMatrix(deals, sorting);
    const dijkstraResult = this.runDijkstra(adjacencyMatrix, source, destination);

    return this.extractShortestPath(dijkstraResult, dealReferenceMap, destination);
  }

  getAdjacencyMatrix(dataList: Deal[], sorting: SortingEnum): Map<string, Deal>[] {
    const matrix: Map<string, Deal>[] = [];

    dataList.forEach((data, key) => {
      const node = dataList[key];
      const from = node.departure;
      const to = node.arrival;
      const cost = node.cost * (1 - (node.discount * .01));
      const time = parseInt(node.duration.h + node.duration.m, null);
      const weight = sorting === SortingEnum.Cheapest ? cost : time;
      const referenceDeal = node.reference;

      if (!matrix[from]) {
        matrix[from] = [];
      }

      if (!matrix[from][to] || weight < matrix[from][to].weight) {
        matrix[from][to] = {weight: weight, referenceDeal: referenceDeal};
      }
    });

    return matrix;
  }

  public runDijkstra(graph: Map<string, Deal>[], source: string, destination: string): DijkstraResult {
    const dist: any[] = [];
    const prev: string[] = [];
    const referenceDealMap: string[] = [];
    const unvisitedQueue: MinPriorityQueue = new MinPriorityQueue();

    dist[source] = 0;

    for (const cityVertex in graph) {
      if (graph.hasOwnProperty(cityVertex)) {
        if (cityVertex !== source) {
          dist[cityVertex] = Infinity;
        }

        prev[cityVertex] = undefined;

        unvisitedQueue.add(cityVertex, dist[cityVertex]);
      }
    }

    while (!unvisitedQueue.isEmpty()) {
      const u = unvisitedQueue.extractMin();

      if (u === destination) {
        break;
      }

      for (const v in graph[u]) {
        if (!unvisitedQueue.inQueue(v)) {
          continue;
        }

        const alt = dist[u] + graph[u][v].weight;

        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
          referenceDealMap[u + v] = graph[u][v].referenceDeal;

          unvisitedQueue.updatePriority(v, alt);
        }
      }
    }

    return {
      prev,
      referenceDealMap
    };
  }

  public extractShortestPath(dijkstraResult: DijkstraResult, dealReferenceMap: Map<string, Deal>[], destination): Deal[] {
    const trips = [];
    let arrivalCity = destination;
    let departureCity = dijkstraResult.prev[arrivalCity];

    while (departureCity !== undefined) {
      trips.push(dealReferenceMap[dijkstraResult.referenceDealMap[departureCity + arrivalCity]]);
      arrivalCity = departureCity;
      departureCity = dijkstraResult.prev[arrivalCity];
    }

    trips.reverse();

    return trips;
  }
}
