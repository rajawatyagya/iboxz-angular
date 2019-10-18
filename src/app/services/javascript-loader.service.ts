import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JavascriptLoaderService {

  constructor() { }

  public loadScripts(urls: string[]) {
    for (const url of urls) {
      const body = document.body as HTMLDivElement;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = url;
      script.async = false;
      script.defer = true;
      body.appendChild(script);
    }
  }
}
