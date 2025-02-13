import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from '../interfaces/gif.interfaces';


@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'SmqEZWtgaqApP4UCbg8ywiqBDDYFnALS';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor ( private http: HttpClient ) {
    this.loadLocalStorage();
  }

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

    this.saveLocalStoragee();

  }

  private saveLocalStoragee(): void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage(): void {
    if ( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0 ) return;

    this.searchTag(this._tagsHistory[0]);
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
        this.gifsList = response.data;
      });

  }

}
