import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-material-c',
  templateUrl: './material-c.component.html',
  styleUrls: ['./material-c.component.css']
})
export class MaterialCComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
  inputBoxes = this.fb.group({
    name: ['', Validators.required],
    myEmail: [''],
  });

  onSubmit() {
    console.log(this.inputBoxes.value);
  }

  ngOnInit() {
    this.inputBoxes.get('name').valueChanges.subscribe(
      createEmail => {
        if(createEmail != " "){
          this.inputBoxes.controls.myEmail.setValue(createEmail + '@myemail.com');
        }
        if(createEmail === ""){
          this.inputBoxes.controls.myEmail.setValue('');
        }
      }
    );
  }

}
