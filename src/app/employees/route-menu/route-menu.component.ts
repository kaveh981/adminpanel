import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../shared-services/auth.service';

@Component({
  selector: 'app-route-menu',
  templateUrl: './route-menu.component.html',
  styleUrls: ['./route-menu.component.css']
})
export class RouteMenuComponent implements OnInit {

  @Input()
  tabId: number;

  tabIndex: number;

  changeTabEvent(e) {
    this.tabIndex = e.index;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
