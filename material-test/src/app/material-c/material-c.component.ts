import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Conta } from '../conta';
import { ContaService } from '../conta.service';
import { EmailCreationService } from '../email-creation.service';

@Component({
  selector: 'app-material-c',
  templateUrl: './material-c.component.html',
  styleUrls: ['./material-c.component.css']
})
export class MaterialCComponent implements OnInit {
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private datePipe: DatePipe,
              private contaService: ContaService, private emailC: EmailCreationService ) { }
  contas: Conta[];

  inputBoxes = this.fb.group({
    name: ['', Validators.required],
    myEmail: ['', Validators.required],
  });
  date = this.fb.control('', Validators.required);
  gender = this.fb.control('', Validators.required);
  role = this.fb.control('', Validators.required);

  validateEntries() {
    if (this.inputBoxes.get('name').value == null || this.date.value == null || this.gender.value == null || this.role.value == null){
      return false;
    } else {
      return true;
    }
  }

  cleanInputs() {
    this.inputBoxes.controls.name.setValue(null);
    this.inputBoxes.controls.myEmail.setValue(null);
    this.date.setValue(null);
    this.gender.setValue(null);
    this.role.setValue(null);
  }

  add() {
    const novaConta = {
        id: null,
        name: this.inputBoxes.get('name').value,
        email: this.inputBoxes.get('myEmail').value.trim(),
        date:   this.datePipe.transform(this.date.value, 'dd-MM-yyyy'),
        gender:  this.gender.value,
        role:  this.role.value
    };
    console.log(this.date.value)
    this.contaService.addConta(novaConta).subscribe(conta => {this.contas.push(conta); } );
    this.cleanInputs();
  }

  delete(conta: Conta): void {
    this.contas = this.contas.filter(h => h !== conta);
    this.contaService.deleteConta(conta).subscribe();
  }

  ngOnInit() {
    this.inputBoxes.get('name').valueChanges.subscribe(
      createEmail => {
        if (createEmail !== '') {
          let temp = this.emailC.createNewEmail(createEmail);
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
