import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MainMenuTabService {

  tabs: any[] = [
    { title: 'Dynamic Title 1', content: '<app-employees-menu></app-employees-menu>' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true }
  ];

  constructor() { }


}
