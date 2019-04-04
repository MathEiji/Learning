import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Conta } from '../conta';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  contas$: Observable<Conta[]>;
  contas: Conta[];

  private searchAccounts = new Subject<string>();
  constructor(private fb: FormBuilder, private contaService: ContaService) { }
  SearchBar = this.fb.group({
    SearchInput: ['', Validators.required]
  });

  search(term: string): void {
    this.searchAccounts.next(term);
  }
  delete(conta: Conta): void {
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
