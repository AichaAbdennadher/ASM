import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';

  show = true;

  ngOnInit() {
    setTimeout(() => {
      this.show = false;
    }, 3000); // disparaît après 3 secondes
  }
}
