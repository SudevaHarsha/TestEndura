import axios from "axios";
import { JSDOM } from "jsdom";
import { OpenAI } from "openai";

/* import dynamic from 'next/dynamic';

const { Jodit } = dynamic(() => import("jodit-react"), {
  ssr: false,
}); */

/* import { Jodit } from "jodit-react";
 */

const assessEssay = async (question, essay) => {
  function extractTextFromHtml(htmlString) {
    // Parse the HTML string using JSDOM
    const dom = new JSDOM(htmlString);
    const doc = dom.window.document;

    // Query the document for paragraph elements
    const paragraphs = doc.querySelectorAll("p");

    // Extract the text content of each paragraph, ignoring any nested tags
    const textContent = Array.from(paragraphs)
      .map((p) => p.textContent.trim())
      .join("\n");

    return textContent;
  }

  const extractedText = extractTextFromHtml(essay);
  console.log(extractedText);

  /*   const apiKey = process.env.OPENAI_API_KEY; // Set your OpenAI API key in environment variable
  const configuration = new Configuration({}) */
  const prompt = `You know everything about scoring IELTS essays. You assess the given essay of the given question and provide feedback to help the writer to improve in the future, and specify mistakes and suggest corrections.

      Your output must be a JSON following this structure:
      {"band": the band, "feedback": your feedback (maximum 100 words), "mistakes":[{"mistake": the whole sentence,"correction": a correction for that sentence]}

      Question: ${question}

      Essay: 
      ${essay}

      JSON:`;

  const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANIZATION_KEY,
  });

  /* axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    )
    .then(response => {
      const assessment = parseOpenAIResponse(response.data.choices[0].text);
      resolve(assessment);
    })
    .catch(error => {
      reject(new Error(`Error while creating completion: ${error.message}`,error));
    }); */
  /*   const essayText = Jodit.modules.Helpers.stripTags(content);
   */
  const contentPrompt = {
    question:
      "As we acquire more knowledge, things do not become more comprehensible,but more complex and mysterious.Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.",
    essay: extractedText,
  };
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an top GRE Evaluator, please evaluate the following essay based by adhering to all GRE standards and give marks as per it only. you are also capable of providing mistakes and corrections for it to user to improve his skills. try to avoid the redundant mistakes an give valid mistakes only.Your output must be a JSON following this structure: {"marks": marks you give to essay based on gre standards, "feedback": your feedback (maximum 100 words), "mistakes":[{"mistake": the whole sentence,"correction": a correction for that sentence]}
          `,
        },
        {
          role: "user",
          content: `question: "As we acquire more knowledge, things do not become more comprehensible,but more complex and mysterious.Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.",
          essay: ${extractedText}
        };
          `,
        },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });
    const response = completion.choices[0].message.content;
    console.log(completion, completion.choices[0].message.content[1].marks);
    return JSON(response)
  } catch (error) {
    console.log(error);
  }
};

function parseOpenAIResponse(response) {
  response = response.trim();
  try {
    const assessment = JSON.parse(response);
    return {
      band: assessment.band,
      feedback: assessment.feedback,
      mistakes: assessment.mistakes,
    };
  } catch (error) {
    throw new Error(`Error while parsing assessment: ${error.message}`);
  }
}

export default assessEssay;
