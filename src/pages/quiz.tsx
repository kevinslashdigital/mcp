import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import QuizFeatures from '@site/src/components/QuizFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import Quiz from "react-quiz-component";
import React, { useState } from "react";

import Certificate from "../components/Certificate"; // Certificate component for download


// https://github.com/wingkwong/react-quiz-component

const starterQuiz = {}
const poQuiz =  {}
const fullsetQuiz = {}

type QuizType = "starter" | "po" | "full";

function HomepageHeader({
  onQuizSelect,
}: {
  onQuizSelect: (quizType: QuizType) => void;
}) {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Welcome to the AWS AI Practitioner Quiz!
        </Heading>
        <p className="hero__subtitle">
          Challenge yourself with this set of questions covering all 5 core
          domains of the AWS AI Practitioner exam. This quiz is designed to help
          you assess your current understanding, identify knowledge gaps, and
          boost your confidence as you prepare for the real certification. Let’s
          test your skills and get exam-ready!
        </p>
        <div className={styles.buttons}>
          <button
            className="button button--secondary button--lg"
            style={{ minWidth: 150, marginRight: 12 }}
            onClick={() => onQuizSelect("starter")}
          >
            Starter Quiz
          </button>
          <button
            className="button button--secondary button--lg"
            style={{ minWidth: 150, marginRight: 12 }}
            onClick={() => onQuizSelect("po")}
          >
            PO Quiz
          </button>
          <button
            className="button button--secondary button--lg"
            style={{ minWidth: 150 }}
            onClick={() => onQuizSelect("full")}
          >
            Full Set Quiz
          </button>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [quizResult, setQuizResult] = useState<any | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  let quizData, quizDuration;
  if (selectedQuiz === "starter") { 
    quizData = starterQuiz; 
    quizDuration = 3600/2; 
  } else if (selectedQuiz === "po") { 
    quizData = poQuiz; 
    quizDuration = 3600; 
  } else if (selectedQuiz === "full") { 
    quizData = fullsetQuiz; 
    quizDuration = 3600*2; 
  }

  // Handler for quiz completion
  function handleQuizComplete(result: any) {
    setQuizResult(result);
    // Calculate pass: 70% of total points or more
    const totalPoints = result.totalPoints || (result.numberOfQuestions * 10) || 100;
    const userPoints = result.correctPoints || result.correctPoints || 0;
    const passed = userPoints / totalPoints >= 0.7;
    setShowCertificate(passed);
  }

  return (
    <Layout
      title="AWS AI Practitioner Exam Quiz"
      description="Challenge yourself with our AWS AI Practitioner Exam Quiz! Test your knowledge across all 5 domains and get exam-ready with instant feedback and explanations."
    >
      {selectedQuiz === null && <HomepageHeader onQuizSelect={setSelectedQuiz} />}
      {selectedQuiz === null && <QuizFeatures />}
      <main>
        {selectedQuiz !== null && quizData && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Quiz
              quiz={quizData}
              timer={quizDuration}
              allowPauseTimer={true}
              shuffle={true}
              shuffleAnswer={true}
              showInstantFeedback={false}
              showDefaultResult={true}
              enableProgressBar={true}
              onComplete={handleQuizComplete}
            />
            {showCertificate && quizResult && (
              <Certificate
                userName={""}
                date={new Date().toLocaleDateString()}
                quizTitle={quizData.quizTitle}
                score={quizResult.correctPoints || quizResult.correctAnswers || 0}
                total={quizResult.totalPoints || (quizResult.numberOfQuestions * 10) || 100}
              />
            )}
            <button
              className="button button--secondary button--sm"
              style={{ margin: 24 }}
              onClick={() => {
                setQuizResult(null);
                setShowCertificate(false);
                setSelectedQuiz(null);
              }}
            >
              Back to Quiz Menu
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
}
