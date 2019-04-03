import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailCreationService {
  createNewEmail(name: string) {
    const re = '.';
    const space = ' ';
    const noSpace = '';
    let email = new String();
    let creator = new String(name);
    creator = creator.replace(space, re);
    while (creator.search(space) !== -1) {
      let index = creator.indexOf(space) + 1;
      creator = creator + creator.charAt(index);
      creator = creator.slice(0, index + 1);
      creator = creator.replace(space, noSpace);
    }
    return creator.toLocaleLowerCase() + '@myemail.com';
  }
  constructor() { }
}
