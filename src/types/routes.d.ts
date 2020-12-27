import {Country, Election} from './api';

export type ElectionStackParamList = {
  Details: {election: Election; title: string; country: Country};
};

export type ModalStackParamList = {
  ModalVideo: {video: string};
  ModalExplainer: {explainer: string; question: string; title: string};
};
