import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'runCode.component.html'})
export class RunCodeComponent implements OnInit {
    submitted = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
      this.submitted = false;
    }

    onSubmit() {
        this.submitted = true;

    }
}
