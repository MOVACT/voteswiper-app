export interface CommonRow {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface Upload extends CommonRow {
  filename: string;
  filetype: string;
  width: number;
  height: number;
  filesize: number;
  alt_text: string;
  public_link: string;
}

export interface Country extends CommonRow {
  country_code: string;
  language_code: string;
  name: string;
  slug: string;
  published: boolean;
}

export interface AlternateLinks {
  [locale: string]: string;
}

export interface Election extends CommonRow {
  country_id: number;
  name: string;
  slug: string;
  published: boolean;
  playable: boolean;
  card_upload_id: number;
  voting_day: string;
  playable_date: string;
  translations_available: string[];
  card: Upload;
  parties_participating: number;
  parties_not_participating: number;
}

export interface Question extends CommonRow {
  election_id: number;
  thesis: string;
  topic: string;
  video_url: string;
  explainer_text: string;
  thumbnail_upload_id: number;
  sort_order: 1;
  thumbnail: Upload;
}

export interface Answer extends CommonRow {
  electionparty_id: number;
  question_id: number;
  answer: number;
  reason: string;
}

export interface PartyPivot extends CommonRow {
  election_id: number;
  party_id: number;
  playable: boolean;
  published: boolean;
  program_upload_id: null | Upload;
  program_link: null | string;
  answers: Answer[];
}

export interface Party extends CommonRow {
  country_id: number;
  name: string;
  slug: string;
  full_name: string;
  url: null | string;
  logo_upload_id: number;
  logo: Upload;
  pivot: PartyPivot;
}

export interface CountryData {
  slug: string;
}
export interface ElectionsData {
  country: string | number;
  include?: 'all' | 'upcoming' | 'past';
}

export interface ElectionByIdData {
  id: number;
}

export interface QuestionsData {
  slug?: string;
  id?: number;
}

export interface PartiesData {
  slug?: string;
  id?: number;
}

export interface StatisticResult {
  status: string;
}

export interface CountAnswerData {
  election_id: number;
  question_id: number;
  answer: number;
  platform: string;
}

export interface InitiateData {
  election_id: number;
  platform: string;
}

export interface ResultData {
  election_id: number;
  result: string;
  top_party_id: number;
  platform: string;
}
