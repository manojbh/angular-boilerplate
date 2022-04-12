import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAfterLastChar'
})
export class GetAfterLastChar implements PipeTransform {

  transform(value: String, findingValue: string): string {

    if (value) {
      var n = value.lastIndexOf(findingValue);
      var result = value.substring(n + 1);

      return result;
    } else {
      return '';
    }
    
  }

}
