import moment from 'moment';
import locale from './locale';

require("moment/locale/de.js");
require("moment/locale/da.js");
require("moment/locale/et.js");
require("moment/locale/fi.js");
require("moment/locale/fr.js");
require("moment/locale/hu.js");
require("moment/locale/it.js");
require("moment/locale/lt.js");
require("moment/locale/el.js");
require("moment/locale/pl.js");
require("moment/locale/ro.js");
require("moment/locale/sv.js");
require("moment/locale/es.js");
require("moment/locale/sl.js");

moment.locale(locale());

export default moment;