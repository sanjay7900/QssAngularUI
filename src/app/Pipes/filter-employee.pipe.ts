import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../Model/Employee';

@Pipe({
  name: 'filterEmployee',
  standalone: true
})
export class FilterEmployeePipe implements PipeTransform {

  transform(data:Employee,filterString:string): boolean {
    if(!filterString)return true;
    if(data.name.toLowerCase().includes(filterString.toLowerCase()) ||
     data.position.toLowerCase().includes(filterString.toLowerCase()))
    return true;
    return false;
  }

}
