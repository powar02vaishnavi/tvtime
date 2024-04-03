import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-storage-result',
  templateUrl: './storage-result.component.html',
  styleUrls: ['./storage-result.component.scss']
})
export class StorageResultComponent implements OnInit {
  @Input() allMovies: Movie[];
  constructor() { }

  pageIndex: number = 0;
  pageSize: number = 15;
  lowValue: number = 0;
  highValue: number = this.pageSize;

  ngOnInit() {
  }

  getPaginatorData(event) {
    if (event.pageIndex === this.pageIndex + 1) {
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue = this.highValue + this.pageSize;
      this.goToTop();
    }
    else if (event.pageIndex === this.pageIndex - 1) {
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue = this.highValue - this.pageSize;
      this.goToTop();
    }
    this.pageIndex = event.pageIndex;
  }

  goToTop(){
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          // how far to scroll on each step
          window.scrollTo(0, pos - 100);
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
  }
}
