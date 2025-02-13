import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'SmqEZWtgaqApP4UCbg8ywiqBDDYFnALS';

  get tagsHistory(): string[] {
    return [ ...this._tagsHistory ];
  }

  private organizeHistory( tag: string): void {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this.tagsHistory
        .filter( (oldTag) => oldTag !== tag) ;
    }

    this._tagsHistory.unshift( tag );

    this._tagsHistory = this.tagsHistory.splice(0, 10);

  }


  searchTag( tag: string ): void {

    if (tag.length == 0) return;

    this.organizeHistory(tag);
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${tag}&limit=10`)
      .then( response => response.json() )
      .then( data => console.log(data));
  }

}
