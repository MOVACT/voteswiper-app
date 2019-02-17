// import NavigationStore from './NavigationStore';
import { AsyncStorage } from 'react-native';
import { create } from 'mobx-persist';
import AppStore from './AppStore';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

const hydrateApp = create({
  storage: AsyncStorage,
  jsonify: true,
});

const app = new AppStore();

export default {
  app,
};

hydrateApp('app', app)
  .then(() => {

    setTimeout(() => {
      app.setHydrated();
    }, 500);
  });