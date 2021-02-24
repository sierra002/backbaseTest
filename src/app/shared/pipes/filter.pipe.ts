import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], name: string): any[] {
    if (!name){
      return items;
    }

    return items.filter((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  }

}
