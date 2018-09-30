import { Injectable } from '@angular/core';
 
@Injectable()
export class StorageData {

  public isDoctor = false;
  public alreadyReaded = false;
  public patientId = '';
  public recordMessage:any='';
  constructor() {
    
  }
}