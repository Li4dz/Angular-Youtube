import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private apiKey:string = "AIzaSyAcT21L-9q1fniyZkZaud_pWKpwIjJ43AI";
  private playList:string = "UUjmGtPZMS9kSLheN4MYO2XQ";

  private nextPageToken:string = "";

  constructor(public http : Http) { }

  getVideos(){
    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new URLSearchParams();
    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playList);
    params.set('key', this.apiKey);

    if(this.nextPageToken){
      params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, {search : params})
              .map(res => {
                console.log(res.json());
                this.nextPageToken = res.json().nextPageToken;

                let videos: any[] = [];
                for(let video of res.json().items){
                  let snippet = video.snippet;
                  videos.push(snippet);
                }

                return videos;
              });
  }

}
