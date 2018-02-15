import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  // Register
  validateRegister(user) {
    if (user.firstName == undefined || user.email == undefined || user.username == undefined || user.password == undefined ) {
      return false
    } else {
      return true
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // Wins
  validateSingleWins(user) {
    if (user.singleWins == undefined) {
      return false
    } else {
      return true
    }
  }
}
