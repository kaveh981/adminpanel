import { Injectable } from '@angular/core';

@Injectable()
export class VisitedComponentsService {

  visitedComponents: string[] = [];

  isVisited(nameVisited: string) {
    if (this.visitedComponents.indexOf(nameVisited) === -1) {
      return false;
    } else {
      return true;
    }
  }

  checkIn(component: string) {
    if (this.visitedComponents.indexOf(component) === -1) {
      this.visitedComponents.push(component);
      return false;
    } else {
      return true;
    }
  }

  constructor() { }

}
