import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout/layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private layoutService: LayoutService
  ) {}

  ngAfterViewInit() {
    this.layoutService.isMobile$.subscribe((isMobile) => {
      if (isMobile) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  onLinkClick(route: string) {
    this.layoutService.isMobile$.subscribe((isMobile) => {
      if (isMobile && this.sidenav.opened) {
        this.sidenav.close();
      }
    });
    this.router.navigate([route], { relativeTo: this.route });
  }

  logout() {
    this.auth.logout();
  }
}
