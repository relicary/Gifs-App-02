import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistory: string[] = [];

  get tagsHistory() {
    return [ ...this._tagsHistory ];
  }

  searchTag( tag: string ):void {

    if (tag.length == 0) return;

    this._tagsHistory.unshift(tag);
  }

}
