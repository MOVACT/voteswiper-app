import React from 'react';
import {Election} from 'types/api';

interface Answer {
  answer: number;
  doubleWeight: boolean;
}
interface Answers {
  [key: string]: {
    [id: number]: Answer;
  };
}

interface Party {
  slug: string;
}
interface Parties {
  [key: string]: string[];
}

interface Context {
  election: null | Election;
  answers: Answers;
  parties: Parties;
  editAnswers: false | {[id: number]: Answer};
  changedAnswers: boolean;
  loadingRecalculated: boolean;
  setElection: (election: null | Election) => void;
  setAnswer: (id: number, answer: number) => void;
  toggleDoubleWeight: (id: number) => void;
  getDoubleWeightValue: (id: number) => void;
  toggleParty: (party: string) => void;
  selectAllParties: (partiesList: Party[]) => void;
  isUnselected: () => void;
  unselectAllParties: () => void;
  isPartyActive: (party: Party) => void;
  clearAnswers: () => void;
  openEditAnswers: () => void;
  closeEditAnswers: () => void;
  setEditAnswer: (id: number, answer: number) => void;
  toggleEditDoubleWeight: (id: number) => void;
  startUpdating: () => void;
  updateResult: () => void;
}

const SwiperContext = React.createContext({} as Context);

const SwiperProvider: React.FC = ({children}) => {
  const [election, setElection] = React.useState<null | Election>(null);
  const [answers, setAnswers] = React.useState<Answers>({});
  const [parties, setParties] = React.useState<Parties>({});

  const [editAnswers, setEditAnswers] = React.useState<
    false | {[id: number]: Answer}
  >(false);
  const [changedAnswers, setChangedAnswers] = React.useState(false);
  const [loadingRecalculated, setLoadingRecalculated] = React.useState(false);

  const setAnswer = React.useCallback(
    (id: number, answer: number) => {
      const answersCopy: Answers = answers;

      // add election object if it doesn't exist yet
      if (!answersCopy[election.slug]) {
        answersCopy[election.slug] = {};
      }

      // add default
      if (!answersCopy[election.slug][id]) {
        answersCopy[election.slug][id] = {
          answer: 0,
          doubleWeight: false,
        };
      }

      // apply answer
      answersCopy[election.slug][id].answer = answer;

      setAnswers(answersCopy);
    },
    [answers, election],
  );

  const toggleDoubleWeight = React.useCallback(
    (id: number) => {
      const answersCopy: Answers = answers;

      // add election object if it doesn't exist yet
      if (!answersCopy[election.slug]) {
        answersCopy[election.slug] = {};
      }

      // add default
      if (!answersCopy[election.slug][id]) {
        answersCopy[election.slug][id] = {
          answer: 0,
          doubleWeight: false,
        };
      }

      answersCopy[election.slug][id].doubleWeight = !answersCopy[election.slug][
        id
      ].doubleWeight;

      setAnswers(answersCopy);
    },
    [answers, election],
  );

  const getDoubleWeightValue = React.useCallback(
    (id: number) => {
      if (!answers[election.slug] || !answers[election.slug][id]) {
        return false;
      }

      return answers[election.slug][id].doubleWeight;
    },
    [answers, election],
  );

  const toggleParty = React.useCallback(
    (party: string) => {
      const partiesCopy = parties;
      if (!partiesCopy[election.slug]) {
        partiesCopy[election.slug] = [];
      }

      const index = partiesCopy[election.slug].indexOf(party);

      if (index > -1) {
        partiesCopy[election.slug].splice(index, 1);
      } else {
        partiesCopy[election.slug].push(party);
      }

      setParties(partiesCopy);
    },
    [parties, election],
  );

  const selectAllParties = React.useCallback(
    (partiesList: Party[]) => {
      const partiesCopy = parties;

      if (!partiesCopy[election.slug]) {
        partiesCopy[election.slug] = [];
      }

      partiesList.map((partyEntry) => {
        const index = partiesCopy[election.slug].indexOf(partyEntry.slug);
        if (index < 0) {
          partiesCopy[election.slug].push(partyEntry.slug);
        }
      });

      setParties(partiesCopy);
    },
    [parties, election],
  );

  const isUnselected = React.useCallback(() => {
    return !parties[election.slug] || parties[election.slug].length === 0;
  }, [parties, election]);

  const unselectAllParties = React.useCallback(() => {
    const partiesCopy = parties;
    partiesCopy[election.slug] = [];

    setParties(partiesCopy);
  }, [parties, election]);

  const isPartyActive = React.useCallback(
    (party: Party) => {
      return (
        parties[election.slug] &&
        parties[election.slug].indexOf(party.slug) > -1
      );
    },
    [parties, election],
  );

  const clearAnswers = React.useCallback(() => {
    const answersCopy = answers;

    if (answersCopy[election.slug]) {
      answersCopy[election.slug] = {};
    }

    setAnswers(answersCopy);
    setEditAnswers(false);
    setChangedAnswers(false);
    setLoadingRecalculated(false);
  }, [answers, election]);

  const openEditAnswers = React.useCallback(() => {
    setEditAnswers(answers[election.slug]);
  }, [answers, election]);

  const closeEditAnswers = React.useCallback(() => {
    setEditAnswers(false);
  }, []);

  const setEditAnswer = React.useCallback(
    (id: number, answer: number) => {
      const editAnswersCopy = editAnswers;
      if (!editAnswersCopy[id]) {
        editAnswersCopy[id] = {
          answer: 0,
          doubleWeight: false,
        };
      }

      editAnswersCopy[id].answer = answer;
      setEditAnswers(editAnswersCopy);
      setChangedAnswers(true);
    },
    [editAnswers],
  );

  const toggleEditDoubleWeight = React.useCallback(
    (id: number) => {
      const editAnswersCopy = editAnswers;
      if (!editAnswersCopy[id]) {
        editAnswersCopy[id] = {
          answer: 0,
          doubleWeight: false,
        };
      }

      editAnswersCopy[id].doubleWeight = !editAnswersCopy[id].doubleWeight;
      setEditAnswers(editAnswersCopy);
      setChangedAnswers(true);
    },
    [editAnswers],
  );

  const startUpdating = React.useCallback(() => {
    setLoadingRecalculated(true);

    const answersCopy = answers;
    if (editAnswers !== false) {
      answersCopy[election.slug] = editAnswers;
    }
    setAnswers(answersCopy);
    setEditAnswers(false);
    setChangedAnswers(false);
  }, [answers, election, editAnswers]);

  const updateResult = React.useCallback(() => {
    setLoadingRecalculated(false);
  }, []);

  return (
    <SwiperContext.Provider
      value={{
        answers,
        parties,
        election,
        editAnswers,
        changedAnswers,
        loadingRecalculated,
        setElection,
        setAnswer,
        toggleDoubleWeight,
        getDoubleWeightValue,
        toggleParty,
        selectAllParties,
        isUnselected,
        unselectAllParties,
        isPartyActive,
        clearAnswers,
        openEditAnswers,
        closeEditAnswers,
        setEditAnswer,
        toggleEditDoubleWeight,
        startUpdating,
        updateResult,
      }}>
      {children}
    </SwiperContext.Provider>
  );
};

const useSwiper = () => React.useContext(SwiperContext);

export {useSwiper};
export default SwiperProvider;
