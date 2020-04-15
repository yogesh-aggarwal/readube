import { Component, OnInit } from "@angular/core";

@Component({
  selector: "notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  showNotifications: boolean = false;

  constructor() {}

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  ngOnInit(): void {}
}
