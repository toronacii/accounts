import { Pipe, PipeTransform } from '@angular/core';
import { Account } from './account.model';

@Pipe({
  name: 'sortAccounts'
})
export class SortAccountsPipe implements PipeTransform {

  transform(items: Account[]): Account[] {
    return items.sort((a, b) => a.type === 'incoming' ? -1 : 1);
  }

}
