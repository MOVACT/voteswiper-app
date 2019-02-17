import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';

class AppStore {
  @persist('object') @observable country = null;
  @persist @observable language = null;

  @action setCountry = country => {
    this.country = country;
  }

  // 1 = no
  // 2 = yes
  @persist @observable didCompleteIntro = 1;
  @observable hydrated = false;

  @action setHydrated = () => {
    this.hydrated = true;
  }

  @action completeIntro = () => {
    this.didCompleteIntro = 2;
  }
}

export default AppStore;
