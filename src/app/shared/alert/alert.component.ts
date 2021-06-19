import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from "protractor";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter();

  onClose() {
    this.close;
  }
}
