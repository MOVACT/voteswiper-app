import {Country, Election, Party} from './api';

export type ElectionStackParamList = {
  Details: {election: Election; title: string; country: Country};
};

export type ModalStackParamList = {
  Video: {video: string};
  Explainer: {explainer: string; question: string; title: string};
  CompareParty: {party: Party};
};
