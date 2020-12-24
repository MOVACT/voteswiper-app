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
}

export interface Election {
  slug: string;
  id: number;
  name: string;
  voting_day: string;
  questions: Question[];
}
