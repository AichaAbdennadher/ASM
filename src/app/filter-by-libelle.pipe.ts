import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByLibelle'
})
export class FilterByLibellePipe implements PipeTransform {
 transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item =>
      item.libelle.toLowerCase().includes(searchText)
    );
  }

}
