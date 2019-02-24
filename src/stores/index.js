// import NavigationStore from './NavigationStore';
import { AsyncStorage } from 'react-native';
import { create } from 'mobx-persist';
import AppStore from './AppStore';
import SwiperStore from './SwiperStore';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

const hydrateApp = create({
  storage: AsyncStorage,
  jsonify: true,
});

const swiper = new SwiperStore();
const app = new AppStore();

export default {
  app,
  swiper
};

hydrateApp('app', app)
  .then(() => {

    setTimeout(() => {
      app.setHydrated();
    }, 500);
  });