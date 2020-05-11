import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loadAllUsers();
    }

    updateUser(user: User) {
        this.userService.update(user).pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.loading = true;
        this.userService.getAll()
            .pipe(first()).subscribe(users => {
                this.loading = false;
                this.users = users;
            });
    }
}