
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Transcript {
  speaker: string;
  text: string;
  timestamp: Date;
}

export const useInterviewLogic = (isSystemAudioOn: boolean) => {
  const navigate = useNavigate();
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [transcript, setTranscript] = useState<Transcript[]>([]);
  const [currentCodingQuestion, setCurrentCodingQuestion] = useState("");
  const [showCodingChallenge, setShowCodingChallenge] = useState(false);
  
  // Interview questions
  const [questions] = useState([
    "Tell me a little about yourself and your background.",
    "What interests you about this position?",
    "What are your greatest strengths that make you suitable for this role?",
    "Can you describe a challenging situation you faced at work and how you handled it?",
    "Where do you see yourself professionally in five years?",
  ]);

  // Coding questions
  const [codingQuestions] = useState([
    "Write a function that finds the longest substring without repeating characters in a given string.",
    "Implement a function to check if a given string is a palindrome.",
    "Create a function that reverses a linked list.",
    "Write a function to find the missing number in an array of integers from 1 to n.",
    "Implement a binary search algorithm to find a target value in a sorted array.",
  ]);

  // Start the interview
  const startInterview = () => {
    setIsInterviewStarted(true);
    setCurrentQuestion(questions[0]);
    
    // Add initial AI question to transcript
    addToTranscript("AI Interviewer", questions[0]);
    
    // Set initial coding question but don't show it yet
    setCurrentCodingQuestion(codingQuestions[0]);
    
    // Simulate AI speaking
    speakText(questions[0]);
  };

  // End the interview
  const endInterview = () => {
    // Navigate back to dashboard
    navigate("/candidate/dashboard");
  };

  // Add message to transcript
  const addToTranscript = (speaker: string, text: string) => {
    setTranscript(prev => [...prev, {
      speaker,
      text,
      timestamp: new Date()
    }]);
  };

  // Simulate AI speaking text
  const speakText = (text: string) => {
    if (!isSystemAudioOn) return;
    
    // Here you would normally integrate with a text-to-speech API
    // For now, we'll just simulate the AI speaking with a console log
    console.log("AI Speaking:", text);
  };

  // Simulate candidate's answer and progress to next question
  const simulateAnswer = () => {
    // In a real app, this would be triggered by speech recognition
    // For demonstration, we'll use a button
    
    const currentIndex = questions.indexOf(currentQuestion);
    
    // Add simulated answer to transcript
    addToTranscript("You", "This is a simulated answer from the candidate.");
    
    // Move to the next question if available
    if (currentIndex < questions.length - 1) {
      const nextQuestion = questions[currentIndex + 1];
      setCurrentQuestion(nextQuestion);
      
      // Add next question to transcript
      setTimeout(() => {
        addToTranscript("AI Interviewer", nextQuestion);
        speakText(nextQuestion);
        
        // After the third question, introduce coding challenge
        if (currentIndex === 2) {
          setTimeout(() => {
            const codingIntro = "Now let's move on to a coding challenge. Please switch to the coding tab to solve the problem.";
            addToTranscript("AI Interviewer", codingIntro);
            speakText(codingIntro);
            setShowCodingChallenge(true);
          }, 1500);
        }
      }, 1000);
    } else {
      // End of interview
      setTimeout(() => {
        addToTranscript("AI Interviewer", "Thank you for your time. The interview is now complete.");
        speakText("Thank you for your time. The interview is now complete.");
      }, 1000);
    }
  };

  return {
    isInterviewStarted,
    currentQuestion,
    transcript,
    startInterview,
    endInterview,
    simulateAnswer,
    currentCodingQuestion,
    showCodingChallenge
  };
};
