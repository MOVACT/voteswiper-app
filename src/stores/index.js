// import NavigationStore from './NavigationStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'mobx-persist';
import AppStore from './AppStore';
import SwiperStore from './SwiperStore';

const hydrateApp = create({
  storage: AsyncStorage,
  jsonify: true,
});

const swiper = new SwiperStore();
const app = new AppStore();

export default {
  app,
  swiper,
};

hydrateApp('app', app).then((err) => {
  console.log(err);
  setTimeout(() => {
    app.setHydrated();
  }, 500);
});
