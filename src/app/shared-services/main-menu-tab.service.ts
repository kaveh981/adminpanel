import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MainMenuTabService {

  tabs: MainTab[] = [];

  constructor() { }

  addNewTab(tab: MainTab) {
    if (!this.tabExist(tab)) {
      this.tabs.push(tab);
    }
  }

  removeTab(tab: MainTab) {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  tabExist(tab: MainTab) {
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].mainName + this.tabs[i].tabId === tab.mainName + tab.tabId) {
        return true;
      }
    }
    return false;
  }

}
