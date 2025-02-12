import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  @ViewChild( 'txtTagInput' )
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag(  ) {

    const newTag = this.tagInput.nativeElement.value;
    console.log({ newTag });
  }
}
