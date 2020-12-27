import {number} from 'prop-types';

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

interface PartyAnswer {
  question_id: number;
  answer: number;
  reason: null | string;
}

export interface Party {
  slug: string;
  id: number;
  logo: string;
  name: string;
  full_name: string;
  pivot: {
    answers: PartyAnswer[];
    program: string;
    url?: null | string;
  };
}

export interface Election {
  slug: string;
  card: string;
  id: number;
  name: string;
  voting_day: string;
  active_date: string;
  active: boolean;
  questions: Question[];
  parties: Party[];
}
