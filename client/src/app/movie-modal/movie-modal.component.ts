import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../models/movie.model';
import {HttpClient} from "@angular/common/http";
import {ChangeDetectorRef} from "@angular/core";

export interface DialogData {
  movie: Movie;
}

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss']
})
export class MovieModalComponent implements OnInit {
  streamingData: any; // Variable to store streaming availability data
  title: string = this.data.movie.Title;
  streamingInfoMessage: string = '';
  dataLoaded: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<MovieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.fetchStreamingAvailability();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  fetchStreamingAvailability() {
    if (!this.title) {
      console.error('Movie title is missing.');
      return;
    }

    const options = {
      headers: {
        'X-RapidAPI-Key': 'your_key',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      },
      params: {
        title: this.title,
        country: 'in',
        show_type: 'movie',
        output_language: 'en'
      }
    };

    this.http.get('https://streaming-availability.p.rapidapi.com/search/title', options)
      .subscribe(
        (response) => {
          this.streamingData = response;
          console.log(this.streamingData);
          this.dataLoaded = true; // Set dataLoaded to true here
        },
        (error) => {
          console.error(error);
        }
      );
  }

  //check which service is it
  isApple(serviceInfo: string): boolean {
    return serviceInfo.toLowerCase().includes('apple');
  }
  isCuriosity(serviceInfo: string): boolean {
    return serviceInfo.toLowerCase().includes('curiosity');
  }
  isHotstar(serviceInfo: string): boolean {
    return serviceInfo.toLowerCase().includes('hotstar');
  }
  isMubi(serviceInfo: string): boolean {
    return serviceInfo.toLowerCase().includes('mubi');
  }
  isNetflix(serviceInfo: string): boolean {
    return serviceInfo.toLowerCase().includes('netflix');
  }
  isPrime(serviceInfo: string): boolean {
    return serviceInfo.toLowerCase().includes('prime');
  }
  isZee5(serviceInfo: string): boolean {
    return serviceInfo.toLowerCase().includes('zee5');
  }
  showStreamingInfo() {
    if (this.streamingData && this.streamingData.result && this.streamingData.result.length > 0) {
      const streamingInfo = this.streamingData.result[0].streamingInfo;

      if (streamingInfo && streamingInfo.in && streamingInfo.in.length > 0) {
        const streamingInfoMessage: string[] = [];

        streamingInfo.in.forEach(serviceInfo => {
          const streamingService = serviceInfo.service;
          const streamingLink = serviceInfo.link;

          if (streamingService && streamingLink) {
            const info = `${streamingService} - ${streamingLink}`;
            if (!streamingInfoMessage.includes(info)) {
              streamingInfoMessage.push(info);
            }
          }
        });

        if (streamingInfoMessage.length > 0) {
          this.streamingInfoMessage = streamingInfoMessage.join('\n');
          this.cdr.detectChanges();
        } else {
          alert('Streaming information is incomplete for this movie.');
        }
      } else {
        alert('Streaming information not available for this movie.');
      }
    } else {
      alert('Streaming information not available for this movie.');
    }
  }

  // Helper function to extract service name from the message
  getServiceName(serviceInfo: string): string {
    const parts = serviceInfo.split(' - ');
    return parts[0];
  }
  // Helper function to extract service link from the message
  getServiceLink(serviceInfo: string): string {
    const parts = serviceInfo.split(' - ');
    return parts[1];
  }

}
