import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

export interface DialogEmailData {
  email: 'matheus.eiji@gmail.com';
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public dialog: MatDialog ) { }
  openDialog() {
    this.dialog.open(NavEmailDialog, {
      data: {
        email: 'email'
      }
    });
  }
  ngOnInit() {}
}

@Component({ // Component responsable for injecting data into the dialog.
  selector: 'nav-email-dialog',
  templateUrl: 'nav-email-dialog.html'
})
export class NavEmailDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogEmailData, public snackBar: MatSnackBar) {}

// Copies the text to the clipboard
  copyEmail(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.snackBar.open('Copied', 'Undo', { // Replying to the user that it has been copied.
      duration: 3000
    });
  }
}
