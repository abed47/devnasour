import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta, private titleService: Title) { }

  generateTags(tags){

    tags = {
      title: 'Angular SSR',
      description: 'Page Description',
      image: '',
      slug: '',
      ...tags
    }

    this.titleService.setTitle(tags.title);

    //twitter tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: 'Devnasour' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Devnasour' });
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({ property: 'og:description', content: tags?.description });
    this.meta.updateTag({ property: 'og:image', content: tags?.image });
    this.meta.updateTag({ property: 'og:url', content: 'our-domain'});

    
  }
}
