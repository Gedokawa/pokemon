import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlToId'
})
export class UrlToIdPipe implements PipeTransform {

  transform(url: string): any {

    let replacedURL = url.replace(/(.*?)pokemon\//, '' );
    let pokemonID = parseInt(replacedURL);

    return pokemonID;
  }

}
