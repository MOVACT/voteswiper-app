export interface Country {
  id: number;
  country_code: string;
  language_code: string;
  name: string;
  slug: string;
  published: boolean;
}

export interface Question {
  id: number;
  question: string;
  title: string;
  video_url: null | string;
  video_legacy: false;
  thumbnail: string;
  explainer_text: null | string;
}

export interface Election {
  slug: string;
  id: number;
  name: string;
  voting_day: string;
  questions: Question[];
}
