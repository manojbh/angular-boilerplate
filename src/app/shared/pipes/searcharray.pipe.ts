import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOnArrayOfObject'
})
export class SearchOnArrayOfObject implements PipeTransform {

  transform(value: Array<any>, findingValue: string): string {
    var val = value.find(entry => entry.id === findingValue);
    if (val) {
      return val.value;
    } else {
      return 'NA';
    }
    return val;
  }

}
