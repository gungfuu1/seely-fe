import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor() { }

  getLabData() {
    const apiUrl = 'https://pokeapi.co/api/v2/ability/1';
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data);
  }

}
