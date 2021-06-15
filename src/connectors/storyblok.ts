import axios from 'axios';
import config from 'common/config';

// workaround for storyblok-js-client since it
// causes the app to crash in the release build
// and i'm not sure why
const fetchStoryblok = (slug: string, language: string) => {
  return axios.get(
    `https://api.storyblok.com/v1/cdn/stories/${slug}?token=${config.storyblokAccessToken}&language=${language}`,
  );
};

export default fetchStoryblok;
