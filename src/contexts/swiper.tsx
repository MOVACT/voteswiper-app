import React from 'react';
import {Election, Party, Question} from 'types/api';

interface Answer {
  answer: number;
  doubleWeight: boolean;
}
interface Answers {
  [key: number]: {
    [id: number]: Answer;
  };
}
interface Parties {
  [key: number]: number[];
}

interface ElectionFull extends Election {
  questions: Question[];
  parties: Party[];
}

interface Context {
  election: null | ElectionFull;
  answers: Answers;
  parties: Parties;
  editAnswers: false | {[id: number]: Answer};
  changedAnswers: boolean;
  loadingRecalculated: boolean;
  setElection: (election: null | ElectionFull) => void;
  setAnswer: (id: number, answer: number) => void;
  toggleDoubleWeight: (id: number) => void;
  getDoubleWeightValue: (id: number) => boolean;
  toggleParty: (party: number) => void;
  selectAllParties: (partiesList: Party[]) => void;
  isUnselected: () => boolean;
  unselectAllParties: () => void;
  isPartyActive: (party: Party) => boolean;
  clearAnswers: () => void;
  openEditAnswers: () => void;
  closeEditAnswers: () => void;
  setEditAnswer: (id: number, answer: number) => void;
  toggleEditDoubleWeight: (id: number) => void;
  startUpdating: () => void;
  updateResult: () => void;
}

export const SwiperContext = React.createContext({} as Context);

const SwiperProvider: React.FC = ({children}) => {
  const [election, setElection] = React.useState<null | ElectionFull>(null);
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
      if (!answersCopy[election!.id]) {
        answersCopy[election!.id] = {};
      }

      // add default
      if (!answersCopy[election!.id][id]) {
        answersCopy[election!.id][id] = {
          answer: 0,
          doubleWeight: false,
        };
      }

      // apply answer
      answersCopy[election!.id][id].answer = answer;

      setAnswers({...answersCopy});
    },
    [answers, election],
  );

  const toggleDoubleWeight = React.useCallback(
    (id: number) => {
      const answersCopy: Answers = answers;

      // add election object if it doesn't exist yet
      if (!answersCopy[election!.id]) {
        answersCopy[election!.id] = {};
      }

      // add default
      if (!answersCopy[election!.id][id]) {
        answersCopy[election!.id][id] = {
          answer: 0,
          doubleWeight: false,
        };
      }

      answersCopy[election!.id][id].doubleWeight = !answersCopy[election!.id][
        id
      ].doubleWeight;

      // trigger a rerender on the swiper
      // this should be improved somewhere else asap
      // @ts-ignore
      setElection({...election});
      setAnswers({...answersCopy});
    },
    [answers, election],
  );

  const getDoubleWeightValue = React.useCallback(
    (id: number) => {
      if (!answers[election!.id] || !answers[election!.id][id]) {
        return false;
      }

      return answers[election!.id][id].doubleWeight;
    },
    [answers, election],
  );

  const toggleParty = React.useCallback(
    (party: number) => {
      const partiesCopy = parties;
      if (!partiesCopy[election!.id]) {
        partiesCopy[election!.id] = [];
      }

      const index = partiesCopy[election!.id].indexOf(party);

      if (index > -1) {
        partiesCopy[election!.id].splice(index, 1);
      } else {
        partiesCopy[election!.id].push(party);
      }

      setParties({...partiesCopy});
    },
    [parties, election],
  );

  const selectAllParties = React.useCallback(
    (partiesList: Party[]) => {
      const partiesCopy = parties;

      if (!partiesCopy[election!.id]) {
        partiesCopy[election!.id] = [];
      }

      partiesList.map((partyEntry) => {
        const index = partiesCopy[election!.id].indexOf(partyEntry.id);
        if (index < 0) {
          partiesCopy[election!.id].push(partyEntry.id);
        }
      });

      setParties({...partiesCopy});
    },
    [parties, election],
  );

  const isUnselected = React.useCallback(() => {
    return !parties[election!.id] || parties[election!.id].length === 0;
  }, [parties, election]);

  const unselectAllParties = React.useCallback(() => {
    const partiesCopy = parties;
    partiesCopy[election!.id] = [];

    setParties({...partiesCopy});
  }, [parties, election]);

  const isPartyActive = React.useCallback(
    (party: Party) => {
      if (!parties[election!.id]) {
        return false;
      }

      return (
        parties[election!.id] && parties[election!.id].indexOf(party.id) > -1
      );
    },
    [parties, election],
  );

  const clearAnswers = React.useCallback(() => {
    const answersCopy = answers;

    if (answersCopy[election!.id]) {
      answersCopy[election!.id] = {};
    }

    setAnswers({...answersCopy});
    setEditAnswers(false);
    setChangedAnswers(false);
    setLoadingRecalculated(false);
  }, [answers, election]);

  const openEditAnswers = React.useCallback(() => {
    setEditAnswers(answers[election!.id]);
  }, [answers, election]);

  const closeEditAnswers = React.useCallback(() => {
    setEditAnswers(false);
  }, []);

  const setEditAnswer = React.useCallback(
    (id: number, answer: number) => {
      if (editAnswers === false) {
        return;
      }

      const editAnswersCopy = editAnswers;
      if (!editAnswersCopy[id]) {
        editAnswersCopy[id] = {
          answer: 0,
          doubleWeight: false,
        };
      }

      editAnswersCopy[id].answer = answer;
      setEditAnswers({...editAnswersCopy});
      setChangedAnswers(true);
    },
    [editAnswers],
  );

  const toggleEditDoubleWeight = React.useCallback(
    (id: number) => {
      if (editAnswers === false) {
        return;
      }

      const editAnswersCopy = editAnswers;
      if (!editAnswersCopy[id]) {
        editAnswersCopy[id] = {
          answer: 0,
          doubleWeight: false,
        };
      }

      editAnswersCopy[id].doubleWeight = !editAnswersCopy[id].doubleWeight;
      setEditAnswers({...editAnswersCopy});
      setChangedAnswers(true);
    },
    [editAnswers],
  );

  const startUpdating = React.useCallback(() => {
    setLoadingRecalculated(true);

    const answersCopy = answers;
    if (editAnswers !== false) {
      answersCopy[election!.id] = editAnswers;
    }
    setAnswers({...answersCopy});
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
