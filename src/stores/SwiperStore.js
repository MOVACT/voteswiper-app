import { observable, action, toJS } from "mobx";

class SwiperStore {
  @observable answers = {};
  @observable parties = {};
  @observable election = null;

  @action
  setElection = election => {
    this.election = election;
  };

  @action
  setAnswer = (id, answer) => {
    if (typeof this.answers[this.election.slug] === "undefined") {
      this.answers[this.election.slug] = {};
    }

    if (typeof this.answers[this.election.slug][id] === "undefined") {
      this.answers[this.election.slug][id] = {
        answer: 0,
        doubleWeight: false
      };
    }

    this.answers[this.election.slug][id].answer = answer;
  };

  @action
  toggleDoubleWeight = id => {
    if (typeof this.answers[this.election.slug] === "undefined") {
      this.answers[this.election.slug] = {};
    }

    if (typeof this.answers[this.election.slug][id] === "undefined") {
      this.answers[this.election.slug][id] = {
        answer: 0,
        doubleWeight: false
      };
    }

    this.answers[this.election.slug][id].doubleWeight = !this.answers[
      this.election.slug
    ][id].doubleWeight;
  };

  @action
  getDoubleWeightValue = id => {
    if (typeof this.answers[this.election.slug] === "undefined") {
      return false;
    }
    if (typeof this.answers[this.election.slug][id] === "undefined") {
      return false;
    }

    return this.answers[this.election.slug][id].doubleWeight;
  };

  @action
  toggleParty = party => {
    if (typeof this.parties[this.election.slug] === "undefined") {
      this.parties[this.election.slug] = [];
    }

    const index = this.parties[this.election.slug].indexOf(party);
    const parties = toJS(this.parties);

    if (index > -1) {
      parties[this.election.slug].splice(index, 1);
    } else {
      parties[this.election.slug].push(party);
    }

    this.parties = parties;
  };

  @action
  selectAllParties = partiesList => {
    if (typeof this.parties[this.election.slug] === "undefined") {
      this.parties[this.election.slug] = [];
    }

    const parties = toJS(this.parties);

    partiesList.map(party => {
      const index = this.parties[this.election.slug].indexOf(party.slug);
      if (index < 0) {
        parties[this.election.slug].push(party.slug);
      }
    });

    this.parties = parties;
  };

  @action
  isUnselected = () => {
    if (typeof this.parties[this.election.slug] === "undefined") {
      this.parties[this.election.slug] = [];
    }

    return this.parties[this.election.slug].length === 0;
  }

  @action
  unselectAllParties = () => {
    this.parties[this.election.slug] = [];
  };

  @action
  isPartyActive = party => {
    if (typeof this.parties[this.election.slug] === "undefined") {
      return false;
    }

    return this.parties[this.election.slug].indexOf(party.slug) > -1;
  };

  @action
  clearAnswers = () => {
    if (typeof this.answers[this.election.slug] != "undefined") {
      this.answers[this.election.slug] = {};
    }
  };
}

export default SwiperStore;
