import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import 'dayjs/locale/en';
import 'dayjs/locale/uk';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

const setDayjsLocale = (locale: string) => {
  dayjs.locale(locale);
};

export { dayjs, setDayjsLocale };
