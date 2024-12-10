import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdepartment',
  standalone: true
})
export class FilterdepartmentPipe implements PipeTransform {

  transform(deparments:any[],filterValue:number): string {
    debugger
    let newDepartment = deparments.filter(x => x.id == filterValue)
    return newDepartment.at(0).name;
  }

}
