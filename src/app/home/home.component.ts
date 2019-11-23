import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }



    runPython() {
        var myPythonScriptPath = 'script.py';

        // Use python shell
        var PythonShell = require('python-shell');
        var pyshell = new PythonShell(myPythonScriptPath);

        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
        });

        // end the input stream and allow the process to exit
        pyshell.end(function (err) {
            if (err){
                throw err;
            };

            console.log('finished');
        });
    }

    private loadAllUsers() {
      let user = localStorage.getItem('currentUser');
      let admin = JSON.parse(user).admin;
      if(admin === true){
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
      }

    }
}
