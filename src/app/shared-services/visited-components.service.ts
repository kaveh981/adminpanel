import { Injectable } from '@angular/core';

@Injectable()
export class VisitedComponentsService {

  visitedComponents: string[] = [];

  isVisited(nameVisited: string) {
    if (this.visitedComponents.indexOf(nameVisited) === -1) {
      this.visitedComponents.push(nameVisited);
      console.log(this.visitedComponents);
      return false;
    } else {
      return true;
    }
  }

  constructor() { }

}
