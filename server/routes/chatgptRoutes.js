import express from 'express';
import openai from './openai.js';

const router = express.Router();

router.route('/').post(async (req, res) => {
  const { todos } = await req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: 'system',
          content: `When responding, welcome the user always as 
                          Mr. TaskDefaulter
                          and say welcome to the Trello Clone App. 
                          Limit the response to 200 characters.`,
        },
        {
          role: 'user',
          content: `Hi there, provide a summary of the following todos. 
                          Count how many todos are in each category 
                          such as To do. in progress and done, 
                          then tell the user to have a productive day!
                          Here's the data: ${JSON.stringify(todos)}`,
        },
      ],
    });

    const { data } = response;

    res.status(200).json({ success: true, data: data.choices[0].message });
  } catch (err) {
    console.log('error', err?.message ?? err);

    // mimic response expected by calling function
    res.status(500).json({ success: false, message: 'Could not connect with ChatGPT' });
  }
});

export default router;
