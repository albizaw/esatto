import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width:768px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.router.events.subscribe(() => {
      if (this.sidenav.mode === 'over' && this.sidenav.opened) {
        this.sidenav.close();
      }
    });
  }

  onLinkClick(route: string) {
    if (this.sidenav.mode === 'over' && this.sidenav.opened) {
      this.sidenav.close();
    }
    this.router.navigate([route], { relativeTo: this.route });
  }

  logout() {
    this.auth.logout();
  }
}
