import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Conta } from '../conta';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-material-c',
  templateUrl: './material-c.component.html',
  styleUrls: ['./material-c.component.css']
})
export class MaterialCComponent implements OnInit {
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private datePipe: DatePipe, private contaService: ContaService) { }
  contas: Conta[];

  inputBoxes = this.fb.group({
    name: ['', Validators.required],
    myEmail: ['', Validators.required], 
  });
  date = this.fb.control('', Validators.required);
  gender = this.fb.control('', Validators.required);
  role = this.fb.control('', Validators.required);

  add(){
    const ran: number = 11;
    let tName: string = this.inputBoxes.controls.name.value.trim();
    let tEmail: string = this.inputBoxes.controls.myEmail.value.trim();
    let tDate: string =  this.datePipe.transform(this.date.value, 'dd-MM-yyyy');
    let tGender: number = this.gender.value;
    let tRole: string = this.role.value;
    this.contaService.addConta({ran , tName,tEmail ,tGender , tDate, tRole} as Conta).subscribe(conta => {this.contas.push(conta)});
  }

  createNewEmail(name: string) {
    const re = '.';
    const space = ' ';
    name = name.replace(space, re);
    return name.toLocaleLowerCase().trim() + '@myemail.com';
  }

  ngOnInit() {
    this.inputBoxes.get('name').valueChanges.subscribe(
      createEmail => {
        if (createEmail !== '') {
          let temp = this.createNewEmail(createEmail);
          this.inputBoxes.controls.myEmail.setValue(temp);
        }
        if (createEmail === '') {
          this.inputBoxes.controls.myEmail.setValue('');
        }
      }
    );
    this.contaService.getContas().subscribe(contas => this.contas = contas);
  }

}
