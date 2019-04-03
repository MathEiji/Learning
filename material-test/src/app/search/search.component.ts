import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Conta } from '../conta';
import { ContaService } from '../conta.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  contas$: Observable<Conta[]>;
  private searchAccounts = new Subject<string>();
  constructor(private fb: FormBuilder, private contaService: ContaService) { }
  SearchBar = this.fb.group({
    SearchInput: ['', Validators.required]
  });
  contas: Conta[];

  search(term: string): void {
    this.searchAccounts.next(term);
  }
  delete(conta: Conta): void {
    this.contas = this.contas.filter(h => h !== conta);
    this.contaService.deleteConta(conta).subscribe();
  }

  ngOnInit() {
    this.contas$ = this.searchAccounts.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.contaService.searchConta(term)),
    );
  }
}
