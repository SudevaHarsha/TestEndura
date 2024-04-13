const questions = 
  {
    AnalyticalWriting: [
      {
        type: "Analytical Writing",
        blankType: "input",
        sentence:
          "Write an essay discussing the impact of technology on modern society.",
        blanks: ["response"],
      },
    ],
    VerbalReasoning1: [
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "2",
        highlightSentence: null,
        question: "What is gre",
        options: [],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: false,
        option: "",
        question: "What is the significance of the passage?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
        image: "/i6.gif",
      },
      // Blank Type Questions
      {
        type: "Blank",
        blankType: "",
        option: "1",
        sentence:
          "Complete the sentence: The __________ is the largest mammal on Earth.",
        options: ["Elephant", "Blue Whale", "Cheetah", "Giraffe"],
        correctAnswer: "B",
      },
      {
        type: "Multiple Choice",
        option: "2",
        question: "Select the countries located in South America.",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
        correctAnswers: ["A", "D"],
        image:"/gre1.jpeg",
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "3",
        highlightSentence:
          "Science fiction often explores the consequences of human interactions with advanced technology.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What is the main theme of the passage?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "4",
        highlightSentence: null,
        question:
          "What is the purpose of the experiment described in the passage?",
        options: [],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: false,
        option: "",
        question: "What is the author's opinion on the topic discussed?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
        image: "/i6.gif",
      },
      // Blank Type Questions
      {
        type: "Blank",
        blankType: "",
        option: "3",
        sentence:
          "Fill in the blank: The __________ is known for its unique ecosystem.",
        options: [
          "Amazon Rainforest",
          "Great Barrier Reef",
          "Sahara Desert",
          "Grand Canyon",
        ],
        correctAnswer: "B",
      },
      {
        type: "Blank",
        blankType: "",
        option: "4",
        sentence:
          "Select the correct option: The Earth revolves around the __________.",
        options: ["Sun", "Moon", "Mars", "Jupiter"],
        correctAnswers: ["A"],
      },
      {
        type: "Blank",
        blankType: "",
        option: "5",
        sentence:
          "Select the correct option: The human body has __________ bones.",
        options: ["206", "156", "306", "106"],
        correctAnswer: "A",
      },
      {
        type: "Blank",
        blankType: "",
        option: "6",
        sentence:
          "Fill in the blank: The __________ is the largest organ in the human body.",
        options: ["Skin", "Heart", "Liver", "Brain"],
        correctAnswer: "A",
      },
      // Analytical Writing Question
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      // Quantitative Analysis Section 1 Questions
      {
        type: "Quantitative",
        question: "Which is more?",
        quantityA: "The area of a circle with radius 5 units.",
        quantityB: "The area of a square with side length 7 units.",
        imageA:"/gre1.jpeg",
        imageB:"/gre2.jpeg",
        options: [
          "A is greater",
          "B is greater",
          "The two quantities are equal",
          "The relationship cannot be determined from the information given",
        ],
      },
      {
        type: "Quantitative",
        question: "Which is more?",
        quantityA:
          "The perimeter of a rectangle with length 12 units and width 4 units.",
        quantityB: "The perimeter of a square with side length 8 units.",
        options: [
          "A is greater",
          "B is greater",
          "The two quantities are equal",
          "The relationship cannot be determined from the information given",
        ],
      },
      {
        type: "Reading Comprehension",
        highlighted: false,
        select: false,
        highlightSentence: null,
        option: "",
        passage: "[Include a short passage]",
        question: "What is the main idea of the passage?",
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"],
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "2",
        highlightSentence: null,
        question: "What is GRE?",
        options: [],
      },
      {
        type: "Blank",
        blankType: "",
        option: "7",
        sentence:
          "Fill in the blank: The study of celestial bodies is known as __________.",
        options: ["Astronomy", "Geography", "Botany", "Zoology"],
        correctAnswer: "A",
      },
      {
        type: "Blank",
        blankType: "",
        option: "8",
        sentence:
          "Complete the sentence: An _________ is a device used to measure electric current.",
        options: ["Ammeter", "Odometer", "Speedometer", "Thermometer"],
        correctAnswer: "A",
      },
    ],
    VerbalReasoning2: [
      {
        type: "Blank",
        blankType: "",
        option: "1",
        sentence:
          "Complete the sentence: The __________ is the verbal 2 mammal on Earth.",
        options: ["Elephant", "Blue Whale", "Cheetah", "Giraffe"],
        correctAnswer: "B",
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "2",
        highlightSentence: null,
        question: "What is gre",
        options: [],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: false,
        option: "",
        question: "What is the significance of the verbal reasoning 2?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
        image: "/i6.gif",
      },
      // Blank Type Questions
      {
        type: "Blank",
        blankType: "",
        option: "2",
        sentence:
          "Fill in the blanks with the correct words: The four main seasons are spring, summer, __________, and winter.",
        options: ["Autumn", "Monsoon", "Fall", "Rainy"],
        correctAnswers: ["A", "D"],
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "3",
        highlightSentence:
          "Science fiction often explores the consequences of human interactions with advanced technology.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What is the main theme of the passage?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "4",
        highlightSentence: null,
        question:
          "What is the purpose of the experiment described in the passage?",
        options: [],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: false,
        option: "",
        question: "What is the author's opinion on the topic discussed?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
        image: "/i6.gif",
      },
      // Blank Type Questions
      {
        type: "Blank",
        blankType: "",
        option: "3",
        sentence:
          "Fill in the blank: The __________ is known for its unique ecosystem.",
        options: [
          "Amazon Rainforest",
          "Great Barrier Reef",
          "Sahara Desert",
          "Grand Canyon",
        ],
        correctAnswer: "B",
      },
      {
        type: "Blank",
        blankType: "",
        option: "4",
        sentence:
          "Select the correct option: The Earth revolves around the __________.",
        options: ["Sun", "Moon", "Mars", "Jupiter"],
        correctAnswers: ["A"],
      },
      {
        type: "Blank",
        blankType: "",
        option: "5",
        sentence:
          "Select the correct option: The human body has __________ bones.",
        options: ["206", "156", "306", "106"],
        correctAnswer: "A",
      },
      {
        type: "Blank",
        blankType: "",
        option: "6",
        sentence:
          "Fill in the blank: The __________ is the largest organ in the human body.",
        options: ["Skin", "Heart", "Liver", "Brain"],
        correctAnswer: "A",
      },
      // Analytical Writing Question
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      // Quantitative Analysis Section 1 Questions
      {
        type: "Quantitative",
        question: "Which is more?",
        quantityA: "The area of a circle with radius 5 units.",
        quantityB: "The area of a square with side length 7 units.",
        options: [
          "A is greater",
          "B is greater",
          "The two quantities are equal",
          "The relationship cannot be determined from the information given",
        ],
      },
      {
        type: "Quantitative",
        question: "Which is more?",
        quantityA:
          "The perimeter of a rectangle with length 12 units and width 4 units.",
        quantityB: "The perimeter of a square with side length 8 units.",
        options: [
          "A is greater",
          "B is greater",
          "The two quantities are equal",
          "The relationship cannot be determined from the information given",
        ],
      },
      {
        type: "Reading Comprehension",
        highlighted: false,
        select: false,
        highlightSentence: null,
        option: "",
        passage: "[Include a short passage]",
        question: "What is the main idea of the passage?",
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"],
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "2",
        highlightSentence: null,
        question: "What is GRE?",
        options: [],
      },
      {
        type: "Blank",
        blankType: "",
        option: "7",
        sentence:
          "Fill in the blank: The study of celestial bodies is known as __________.",
        options: ["Astronomy", "Geography", "Botany", "Zoology"],
        correctAnswer: "A",
      },
      {
        type: "Blank",
        blankType: "",
        option: "8",
        sentence:
          "Complete the sentence: An _________ is a device used to measure electric current.",
        options: ["Ammeter", "Odometer", "Speedometer", "Thermometer"],
        correctAnswer: "A",
      },
    ],
    QuantativeReasoning1: [
      {
        type: "Blank",
        blankType: "",
        option: "1",
        sentence:
          "Complete the sentence: The __________ is the Quantative 2 mammal on Earth.",
        options: ["Elephant", "Blue Whale", "Cheetah", "Giraffe"],
        correctAnswer: "B",
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "2",
        highlightSentence: null,
        question: "What is gre",
        options: [],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: false,
        option: "",
        question: "What is the significance of the verbal reasoning 2?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
        image: "/i6.gif",
      },
      // Blank Type Questions
      {
        type: "Blank",
        blankType: "",
        option: "2",
        sentence:
          "Fill in the blanks with the correct words: The four main seasons are spring, summer, __________, and winter.",
        options: ["Autumn", "Monsoon", "Fall", "Rainy"],
        correctAnswers: ["A", "D"],
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "3",
        highlightSentence:
          "Science fiction often explores the consequences of human interactions with advanced technology.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What is the main theme of the passage?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "4",
        highlightSentence: null,
        question:
          "What is the purpose of the experiment described in the passage?",
        options: [],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: false,
        option: "",
        question: "What is the author's opinion on the topic discussed?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
        image: "/i6.gif",
      },
      // Blank Type Questions
      {
        type: "Blank",
        blankType: "",
        option: "3",
        sentence:
          "Fill in the blank: The __________ is known for its unique ecosystem.",
        options: [
          "Amazon Rainforest",
          "Great Barrier Reef",
          "Sahara Desert",
          "Grand Canyon",
        ],
        correctAnswer: "B",
      },
      {
        type: "Blank",
        blankType: "",
        option: "4",
        sentence:
          "Select the correct option: The Earth revolves around the __________.",
        options: ["Sun", "Moon", "Mars", "Jupiter"],
        correctAnswers: ["A"],
      },
      {
        type: "Blank",
        blankType: "",
        option: "5",
        sentence:
          "Select the correct option: The human body has __________ bones.",
        options: ["206", "156", "306", "106"],
        correctAnswer: "A",
      },
      {
        type: "Blank",
        blankType: "",
        option: "6",
        sentence:
          "Fill in the blank: The __________ is the largest organ in the human body.",
        options: ["Skin", "Heart", "Liver", "Brain"],
        correctAnswer: "A",
      },
      // Analytical Writing Question
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      // Quantitative Analysis Section 1 Questions
      {
        type: "Quantitative",
        question: "Which is more?",
        quantityA: "The area of a circle with radius 5 units.",
        quantityB: "The area of a square with side length 7 units.",
        options: [
          "A is greater",
          "B is greater",
          "The two quantities are equal",
          "The relationship cannot be determined from the information given",
        ],
      },
      {
        type: "Quantitative",
        question: "Which is more?",
        quantityA:
          "The perimeter of a rectangle with length 12 units and width 4 units.",
        quantityB: "The perimeter of a square with side length 8 units.",
        options: [
          "A is greater",
          "B is greater",
          "The two quantities are equal",
          "The relationship cannot be determined from the information given",
        ],
      },
      {
        type: "Reading Comprehension",
        highlighted: false,
        select: false,
        highlightSentence: null,
        option: "",
        passage: "[Include a short passage]",
        question: "What is the main idea of the passage?",
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"],
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "2",
        highlightSentence: null,
        question: "What is GRE?",
        options: [],
      },
      {
        type: "Blank",
        blankType: "",
        option: "7",
        sentence:
          "Fill in the blank: The study of celestial bodies is known as __________.",
        options: ["Astronomy", "Geography", "Botany", "Zoology"],
        correctAnswer: "A",
      },
      {
        type: "Blank",
        blankType: "",
        option: "8",
        sentence:
          "Complete the sentence: An _________ is a device used to measure electric current.",
        options: ["Ammeter", "Odometer", "Speedometer", "Thermometer"],
        correctAnswer: "A",
      },
    ],
    QuantativeReasoning2: [
      {
        type: "Blank",
        blankType: "",
        option: "1",
        sentence:
          "Complete the sentence: The __________ is the Quantative 2 mammal on Earth.",
        options: ["Elephant", "Blue Whale", "Cheetah", "Giraffe"],
        correctAnswer: "B",
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "2",
        highlightSentence: null,
        question: "What is gre",
        options: [],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: false,
        option: "",
        question: "What is the significance of the verbal reasoning 2?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
        image: "/i6.gif",
      },
      // Blank Type Questions
      {
        type: "Blank",
        blankType: "",
        option: "2",
        sentence:
          "Fill in the blanks with the correct words: The four main seasons are spring, summer, __________, and winter.",
        options: ["Autumn", "Monsoon", "Fall", "Rainy"],
        correctAnswers: ["A", "D"],
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "3",
        highlightSentence:
          "Science fiction often explores the consequences of human interactions with advanced technology.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What is the main theme of the passage?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "4",
        highlightSentence: null,
        question:
          "What is the purpose of the experiment described in the passage?",
        options: [],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: false,
        option: "",
        question: "What is the author's opinion on the topic discussed?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
        image: "/i6.gif",
      },
      // Blank Type Questions
      {
        type: "Blank",
        blankType: "",
        option: "3",
        sentence:
          "Fill in the blank: The __________ is known for its unique ecosystem.",
        options: [
          "Amazon Rainforest",
          "Great Barrier Reef",
          "Sahara Desert",
          "Grand Canyon",
        ],
        correctAnswer: "B",
      },
      {
        type: "Blank",
        blankType: "",
        option: "4",
        sentence:
          "Select the correct option: The Earth revolves around the __________.",
        options: ["Sun", "Moon", "Mars", "Jupiter"],
        correctAnswers: ["A"],
      },
      {
        type: "Blank",
        blankType: "",
        option: "5",
        sentence:
          "Select the correct option: The human body has __________ bones.",
        options: ["206", "156", "306", "106"],
        correctAnswer: "A",
      },
      {
        type: "Blank",
        blankType: "",
        option: "6",
        sentence:
          "Fill in the blank: The __________ is the largest organ in the human body.",
        options: ["Skin", "Heart", "Liver", "Brain"],
        correctAnswer: "A",
      },
      // Analytical Writing Question
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Brazil", "China", "Australia", "Argentina", "Mexico"],
      },
      // Quantitative Analysis Section 1 Questions
      {
        type: "Quantitative",
        question: "Which is more?",
        quantityA: "The area of a circle with radius 5 units.",
        quantityB: "The area of a square with side length 7 units.",
        options: [
          "A is greater",
          "B is greater",
          "The two quantities are equal",
          "The relationship cannot be determined from the information given",
        ],
      },
      {
        type: "Quantitative",
        question: "Which is more?",
        quantityA:
          "The perimeter of a rectangle with length 12 units and width 4 units.",
        quantityB: "The perimeter of a square with side length 8 units.",
        options: [
          "A is greater",
          "B is greater",
          "The two quantities are equal",
          "The relationship cannot be determined from the information given",
        ],
      },
      {
        type: "Reading Comprehension",
        highlighted: false,
        select: false,
        highlightSentence: null,
        option: "",
        passage: "[Include a short passage]",
        question: "What is the main idea of the passage?",
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"],
      },
      {
        type: "Reading Comprehension",
        highlighted: true,
        select: false,
        option: "1",
        highlightSentence:
          "In the realm of science and medicine, relentless exploration leads to groundbreaking discoveries.",
        passage: "[Include a short passage with a highlighted sentence]",
        question: "What does the highlighted sentence suggest?",
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"],
      },
      {
        type: "Reading Comprehension",
        passage: "[Include a short passage]",
        highlighted: false,
        select: true,
        option: "2",
        highlightSentence: null,
        question: "What is GRE?",
        options: [],
      },
      {
        type: "Blank",
        blankType: "",
        option: "7",
        sentence:
          "Fill in the blank: The study of celestial bodies is known as __________.",
        options: ["Astronomy", "Geography", "Botany", "Zoology"],
        correctAnswer: "A",
      },
      {
        type: "Blank",
        blankType: "",
        option: "8",
        sentence:
          "Complete the sentence: An _________ is a device used to measure electric current.",
        options: ["Ammeter", "Odometer", "Speedometer", "Thermometer"],
        correctAnswer: "A",
      },
    ],
  }

export default questions;
