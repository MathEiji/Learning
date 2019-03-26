import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  email: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void{
    const dialogRef=this.dialog.open(DialogOverviewExampleDialog,{
      width: '250px',
      data: {email: this.email}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email=result;
    });
  }

  ngOnInit() {
  }

}
@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: 'nav-email-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

