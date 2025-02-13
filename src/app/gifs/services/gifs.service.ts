import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SearchResponse } from '../interfaces/gif.interfaces';


@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string = 'SmqEZWtgaqApP4UCbg8ywiqBDDYFnALS';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor ( private http: HttpClient ) {}

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

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params: params })
      .subscribe( response => {
        console.log(response)
      });

  }

}
