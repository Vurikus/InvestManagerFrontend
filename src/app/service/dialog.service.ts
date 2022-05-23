import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private active = false;

  constructor() { }

  public changeVisible(): void{
    this.active = !this.active;
  }

  public isVisibleDialog(): boolean{
    return this.active;
  }
}
