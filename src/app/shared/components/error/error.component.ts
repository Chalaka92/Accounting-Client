import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInUpAnimation } from '@template/animations/fade-in-up.animation';

@Component({
  selector: 'template-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  animations: [fadeInUpAnimation],
})
export class ErrorComponent implements OnInit {
  @Input() mainTitle: string;
  @Input() subTitle: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const status = this.activatedRoute.snapshot.queryParamMap.get('status');

    if (status === 'forbidden') {
      this.mainTitle = '403 - Forbidden';
      this.subTitle =
        "You didn't have the permission to access this page. Please contact the administration";
    }
    if (status === 'notFound') {
      this.mainTitle = '404 - Not Found';
      this.subTitle = '';
    }
  }
}
