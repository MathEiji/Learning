import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-material-c',
  templateUrl: './material-c.component.html',
  styleUrls: ['./material-c.component.css']
})
export class MaterialCComponent implements OnInit {
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private datePipe: DatePipe) { }

  inputBoxes = this.fb.group({
    name: ['', Validators.required],
    myEmail: ['', Validators.required],
  });
  date = this.fb.control('', Validators.required);
  gender = this.fb.control('', Validators.required);
  role = this.fb.control('', Validators.required);

  onSubmit() {
   let tName = this.inputBoxes.controls.name.value;
   let tEmail = this.inputBoxes.controls.myEmail.value;
   let tDate =  this.datePipe.transform(this.date.value, 'dd-MM-yyyy');
   this.snackBar.open('Registrado: ' + tName + '--> ' + tEmail + '--> Data: ' + tDate);
  }

  ngOnInit() {
    this.inputBoxes.get('name').valueChanges.subscribe(
      createEmail => {
        if (createEmail !== '') {
          this.inputBoxes.controls.myEmail.setValue(createEmail + '@myemail.com');
        }
        if (createEmail === '') {
          this.inputBoxes.controls.myEmail.setValue('');
        }
      }
    );
  }

}
