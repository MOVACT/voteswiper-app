const lang = {
  name: 'فارسی',
  countryLanguage: 'farsi',

  'navigation.backTitle': 'برگشت',
  'navigation.helpTitle': 'سوال و جواب',
  'navigation.electionsTitle': 'انتخابات',
  'navigation.infoTitle': 'اطلاعات',

  // Component:ElectionPill
  'electionPill.availableFrom': '{1} در دسترس از',

  // Countdown
  'countdown.days': 'روزها',
  'countdown.hours': 'ساعات',
  'countdown.minutes': 'دقایق',
  'countdown.seconds': 'ثانیه ها',

  // Swiper
  'swiper.doubleWeight': 'وزن دوبرابر',
  'swiper.doubleWeighted': 'وزن دوبرابر',
  'swiper.questionNumber': 'سوال {1} از {2}',
  'swiper.yes': 'بله',
  'swiper.no': 'خیر',
  'swiper.none': 'هیچکدام',
  'swiper.skip': 'پریدن',
  'swiper.cancelTitle': 'مطمینی که میخواهی متوقف کنی؟',
  'swiper.cancelText': 'پیشرفت تو حذف شد و تو باید از اول شروع کنی',
  'swiper.cancelActionNo': 'خیر، برگشت ',
  'swiper.cancelActionYes': 'بله',

  'swiperSelectParties.text':
    'حالا دیگر احزاب را انتخاب کن که میخواهی جواب هایت را با آنها مقایسه کنی. تا جای که میخواهی میتوانی احزاب انتخاب کنی.',
  'swiperSelectParties.checkAll': 'همه منتخبین',
  'swiperSelectParties.uncheckAll': 'همه غیر منتخبین',
  'swiperSelectParties.chooseMinOne': 'حداقل یک حزب را برای ادامه انتخاب کن',
  'swiperSelectParties.nextButton': 'بعدی',

  'swiperResult.topmatch': 'بهترین انطباق تو',
  'swiperResult.program': 'بیانیه',
  'swiperResult.shareTitle': ' نتیجه #WahlSwiper',
  'swiperResult.shareMessage': 'نتیجه WahlSwiper من برای {1}',
  'swiperResult.screenshotTitle': 'نتیجه WahlSwiper برای {1}',

  'swiperResult.comparisonWith': 'مقایسه من با »{1}«',
  'swiperResult.readReasoning': 'خواندن دلایل حزب',
  'swiperResult.closeReasoning': 'بستن دلایل',
  'swiperResult.noReason': 'حزب دلیل ارایه نداده',
  'swiperResult.yourAnswer': 'جواب تو',
  'swiperResult.party': 'حزب',

  'swiperResult.yourResult': 'نتیجه تو',
  'swiperResult.chooseParties': 'انتخاب حزب',
  'swiperResult.share': 'انتشار',
  'swiperResult.parties': 'احزاب',
  'swiperResult.filterParties': 'احزاب فیلتر شده',

  'swiperResult.editAnswers': 'تصحیح جوابها',

  // Screen:SelectCountry,
  'selectCountry.title': 'مرسی که همراهی کردی!',
  'selectCountry.introText':
    'برای شروع، کشوری که در ان زندگی می کنی یا اجازه رای داری را انتخاب کن',

  // Screen:SettingsCountry
  'settingsCountry.title': 'کشورها',
  'settingsCountry.boxTitle': 'تغییر کشور',
  'settingsCountry.boxText':
    'ما سوالات کشورها را کنار زبان ان کشور به زبان انگلیسی هم ترجمه کردیم، تا بتوانی راجع به احزاب انجا و دیدگاه هایشان هم اطلاعات کسب کنی ',

  'settings.title': 'تنظیمات',
  'settingsLanguage.boxTitle': 'زبان اپ',
  'settingsLanguage.boxText': 'زبان اپ را عوض کن',
  'settings.systemDefault': 'سیستم استاندارد',
  'settings.systemDefaultText':
    'از زبان تلفنت استفاده میکند درصورتی که ترجمه وجود داشته باشد. وگر نه به انگلیسی.',

  // Screen:ElectionsIndex
  'electionsIndex.boxTitle': 'انتخابات کنونی',
  'electionsIndex.boxText':
    'یک انتخاباتی راانتخاب کن  که برایش میخواهی سوایپ کنی. ',
  'electionsIndex.boxPastTitle': 'انتخابات گذشته',
  'electionsIndex.boxPastText':
    'این WahlSwiper برای انتخابات گذشته هستند. لطفا توجه بفرمایید که دیدگاه احزاب در مورد یک سری نکته های این نظر سنجی تغییر کرده باشه.',
  'electionsIndex.noElections': 'برای این کشورWahlSwiper کنونی وجود ندارند.',

  // Screen:ElectionDetails
  'electionDetails.countdownPast': 'رای گیری در  برگذار شد.',
  'electionDetails.countdown': 'روزشمار رای گیری',
  'electionDetails.infoText':
    'ما یک سری سوال راجع به موضوعات سیاسی از شما میپرسیم. از طریق سوایپ جواب بده و ما شمارا با یک حزبی که به دیدگاه شما میخورد وصل میکنیم.',
  'electionDetails.startButtonText': 'شروع',

  // Screen:HelpIndex
  'helpIndex.title': 'سوال وجواب',

  // Screen:InfosIndex
  'infosIndex.title': 'اطلاعات',
  'infosIndex.headline': 'درباره WahlSwiper',
  'infosIndex.paragraph1':
    'شکل گیری دیدگاه درباره ی انتخابات قرار است اسان باشد و خوش بگذرد ـ این ماموریت ما درWahlSwiper است. قاعده : سوالات سیاسی میتوان با سوایپ اسان به چپ به „نه„ و راست به „بله„ انجام بشود.WahlSwiper بعد انطباق با احزاب را حساب میکند.',
  'infosIndex.paragraph2':
    'ما ازوضوح خوشمان می اید. نزد ما فقط بله و خیروجود دارد، نه شاید. این شاید برای احزاب سختی بیارد اما به شما کمک میکند تصمیم بگیرید. شما در هر صورت میتوانید سوالها را بدون جواب رد کنید.',
  'infosIndex.paragraph3':
    'رای دادن مثل ملاقاتهای مجازی آسان است -اما حداقل با انطباقت هم عقیده هستی حتی اگر فقط برای یه دوره باشد.',
  'infosIndex.imprintButton': ' پروانه ساخت',
  'infosIndex.imprintLink': 'https://www.voteswiper.org/fa/page/imprint',
  'infosIndex.privacyButton': 'حریم خصوصی',
  'infosIndex.privacyLink': 'https://www.voteswiper.org/fa/page/privacy',

  'swiperResult.share.loading': 'Loading...',
};

export default lang;
