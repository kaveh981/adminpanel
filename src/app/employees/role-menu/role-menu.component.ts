import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../shared-services/auth.service';

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.css']
})
export class RoleMenuComponent implements OnInit {

  @Input()
  tabId: number;

  tabIndex: number;

  changeTabEvent(e) {
    this.tabIndex = e.index;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    alert('role');
  }

}
