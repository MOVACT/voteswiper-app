import moment from 'moment';
import locale from './locale';

require("moment/locale/de.js");

moment.locale(locale());

export default moment;