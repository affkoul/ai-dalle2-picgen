import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '...',
});

const openai = new OpenAIApi(configuration);

export default openai;
