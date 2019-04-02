import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Conta } from './conta';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contas = [
      {id: 1, name: 'Lucas Gomes', email: 'lucasg@mymail.com',gender: 1, date: '02-04-2019', role: 'Gerente'},
      {id: 2, name: 'Matheus Eiji Moriya', email: 'matheus.eiji@mymail.com', gender: 1, date: '01-04-2019', role: 'Gerente'}
    ];
    return {contas};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  genId(conta: Conta[]): number {
    return conta.length > 0 ? Math.max(...conta.map(contas => contas.id)) + 1 : 11;
  }
  constructor() { }
}
