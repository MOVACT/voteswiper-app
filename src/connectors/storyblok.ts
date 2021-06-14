import config from 'common/config';
import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  accessToken: config.storyblokAccessToken,
});

export default Storyblok;
