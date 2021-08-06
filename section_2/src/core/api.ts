import { NEWS_URL, CONTENT_URL } from '../config';
import { NewsFeed, NewsDetail } from '../types';

export default class Api {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async request<AjaxResponse>(): Promise<AjaxResponse> {
    const response = await fetch(this.url);
    // return 할때도 통신(Promise)로 전달해야합니다, 그래서 await 추가해 줍니다.
    return await response.json() as AjaxResponse;
  }
}

export class NewsFeedApi extends Api {
  constructor() {
    super(NEWS_URL);
  }

  async getData(): Promise<NewsFeed[]> {
    return this.request<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  constructor(id: string) {
    super(CONTENT_URL.replace('@id', id));
  }

  async getData(): Promise<NewsDetail> {
    return this.request<NewsDetail>();
  }
}
