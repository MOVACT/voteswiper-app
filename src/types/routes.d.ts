import {Country, Election} from './api';

export type ElectionStackParamList = {
  Details: {election: Election; title: string; country: Country};
};
