/**
 * IndianFoodQuiz.jsx
 *
 * CLASS COMPONENT — converted from functional to demonstrate:
 *   - Class-based state via this.state and this.setState
 *   - Lifecycle methods: componentDidMount, componentDidUpdate, componentWillUnmount
 *   - Class methods bound to `this`
 *   - render() method returning JSX
 *
 * Functionally identical to the original — the quiz works exactly the same.
 */

import React, { Component } from "react";

const QUESTIONS = [
  {
    question: "Where is Rice commonly eaten?",
    options: ["South India", "Europe", "America"],
    answer: "South India"
  },
  {
    question: "Which bread comes from North India?",
    options: ["Dosa", "Naan", "Idli"],
    answer: "Naan"
  },
  {
    question: "Which food is spicy and common in Andhra cuisine?",
    options: ["Mirchi", "Sugar", "Milk"],
    answer: "Mirchi"
  },
  {
    question: "Dosa belongs to which region?",
    options: ["South India", "North India", "West India"],
    answer: "South India"
  }
];

class IndianFoodQuiz extends Component {

  // ── Constructor: initialise class state ──────────────────────
  constructor(props) {
    super(props);
    this.state = {
      userAnswers: {},   // { questionIndex: selectedOption }
      submitted: false,
      timeSpent: 0       // tracks seconds spent on quiz (used in lifecycle demo)
    };

    // Bind class methods to `this` so they work as event handlers
    this.handleSelect       = this.handleSelect.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
    this.handleReset        = this.handleReset.bind(this);
  }

  // ── componentDidMount: runs once after component mounts ──────
  // Used here to start a timer tracking how long the child spends
  componentDidMount() {
    console.log("IndianFoodQuiz mounted — starting quiz timer");
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        timeSpent: prevState.timeSpent + 1
      }));
    }, 1000);
  }

  // ── componentDidUpdate: runs after every state/prop change ───
  // Used here to log when the quiz is submitted
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.submitted && this.state.submitted) {
      console.log(
        `Quiz submitted! Score: ${this.getScore()} / ${QUESTIONS.length}. Time: ${this.state.timeSpent}s`
      );
      // Stop the timer once quiz is done
      clearInterval(this.timer);
    }
  }

  // ── componentWillUnmount: cleanup before component is removed ─
  componentWillUnmount() {
    console.log("IndianFoodQuiz unmounting — clearing timer");
    clearInterval(this.timer);
  }

  // ── Class methods ────────────────────────────────────────────

  // Called when a child selects an answer option
  handleSelect(qIndex, option) {
    this.setState(prevState => ({
      userAnswers: {
        ...prevState.userAnswers,
        [qIndex]: option
      }
    }));
  }

  // Called when child clicks Submit
  handleSubmit() {
    this.setState({ submitted: true });
  }

  // Called when child clicks Try Again
  handleReset() {
    this.setState({
      userAnswers: {},
      submitted: false,
      timeSpent: 0
    });
    // Restart timer
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        timeSpent: prevState.timeSpent + 1
      }));
    }, 1000);
  }

  // Helper: compute current score (used in both render and componentDidUpdate)
  getScore() {
    return QUESTIONS.filter(
      (q, i) => this.state.userAnswers[i] === q.answer
    ).length;
  }

  // Helper: format seconds as mm:ss
  formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // ── render: the only required method in a class component ────
  render() {
    const { userAnswers, submitted, timeSpent } = this.state;
    const score = this.getScore();
    const allAnswered = Object.keys(userAnswers).length === QUESTIONS.length;

    return (
      <div className="food-quiz-container">
        <h2 className="food-quiz-title">🍽️ Indian Food Quiz</h2>

        {/* Timer — shows how long child has been on quiz */}
        <p className="quiz-timer">
          ⏱️ Time: {this.formatTime(timeSpent)}
        </p>

        {!submitted ? (
          <>
            {QUESTIONS.map((q, i) => (
              <div key={i} className="quiz-question">
                <h3>
                  <span className="q-number">Q{i + 1}.</span> {q.question}
                </h3>

                {q.options.map((opt) => (
                  <button
                    key={opt}
                    className={`quiz-option ${userAnswers[i] === opt ? "selected" : ""}`}
                    onClick={() => this.handleSelect(i, opt)}
                  >
                    {userAnswers[i] === opt ? "✅ " : ""}{opt}
                  </button>
                ))}
              </div>
            ))}

            <button
              className="submit-btn"
              onClick={this.handleSubmit}
              disabled={!allAnswered}
              style={{ opacity: allAnswered ? 1 : 0.5, cursor: allAnswered ? "pointer" : "not-allowed" }}
            >
              {allAnswered ? "Submit Quiz 🚀" : `Answer all questions (${Object.keys(userAnswers).length}/${QUESTIONS.length})`}
            </button>
          </>
        ) : (
          <div className="result-box">
            <div className="result-emoji">
              {score === QUESTIONS.length ? "🏆" : score >= 2 ? "🎉" : "💪"}
            </div>
            <h3>
              You scored {score} / {QUESTIONS.length}!
            </h3>
            <p className="result-msg">
              {score === QUESTIONS.length
                ? "Perfect! You know your Indian food! 🍛"
                : score >= 2
                ? "Great job! A little more practice and you'll ace it!"
                : "Keep learning! You can do it! 🌟"}
            </p>
            <p className="result-time">
              Completed in {this.formatTime(timeSpent)}
            </p>

            {/* Show correct answers */}
            <div className="answer-review">
              {QUESTIONS.map((q, i) => {
                const isCorrect = userAnswers[i] === q.answer;
                return (
                  <div key={i} className={`answer-item ${isCorrect ? "correct" : "wrong"}`}>
                    <strong>Q{i + 1}:</strong> {q.question}<br />
                    Your answer: <em>{userAnswers[i]}</em>
                    {isCorrect ? " ✅" : ` ❌ (Correct: ${q.answer})`}
                  </div>
                );
              })}
            </div>

            <button className="reset-btn" onClick={this.handleReset}>
              🔄 Try Again
            </button>
          </div>
        )}

        {/* Inline CSS */}
        <style>{`
          .food-quiz-container {
            max-width: 900px;
            margin: 40px auto;
            background: white;
            border: 4px solid #fde047;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          }

          .food-quiz-title {
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            color: #ca8a04;
            margin-bottom: 8px;
          }

          .quiz-timer {
            text-align: center;
            font-size: 15px;
            color: #9ca3af;
            font-weight: 600;
            margin-bottom: 28px;
          }

          .quiz-question {
            margin-bottom: 28px;
          }

          .q-number {
            color: #f59e0b;
            font-weight: 900;
          }

          .quiz-question h3 {
            font-size: 20px;
            color: #1f2937;
            margin-bottom: 12px;
            line-height: 1.5;
          }

          .quiz-option {
            width: 100%;
            padding: 14px 18px;
            margin-bottom: 10px;
            border-radius: 14px;
            border: 2px solid #e5e7eb;
            background-color: #f9fafb;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: #374151;
            text-align: left;
          }

          .quiz-option:hover {
            background-color: #fef3c7;
          }

          .quiz-option.selected {
            background-color: #22c55e;
            color: white;
            border-color: #16a34a;
          }

          .submit-btn {
            margin-top: 24px;
            padding: 16px 32px;
            background-color: #f59e0b;
            color: white;
            border-radius: 9999px;
            border: none;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            display: block;
            margin-left: auto;
            margin-right: auto;
            transition: transform 0.2s;
          }

          .submit-btn:hover {
            transform: scale(1.05);
          }

          .result-box {
            text-align: center;
          }

          .result-emoji {
            font-size: 80px;
            margin-bottom: 12px;
          }

          .result-box h3 {
            font-size: 32px;
            font-weight: 900;
            color: #1f2937;
            margin-bottom: 8px;
          }

          .result-msg {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 6px;
          }

          .result-time {
            font-size: 14px;
            color: #9ca3af;
            margin-bottom: 24px;
          }

          .answer-review {
            text-align: left;
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .answer-item {
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 15px;
            line-height: 1.6;
          }

          .answer-item.correct {
            background: #d1fae5;
            border: 1.5px solid #6ee7b7;
            color: #065f46;
          }

          .answer-item.wrong {
            background: #fee2e2;
            border: 1.5px solid #fca5a5;
            color: #991b1b;
          }

          .reset-btn {
            margin-top: 8px;
            padding: 14px 32px;
            background-color: #8b5cf6;
            color: white;
            border-radius: 9999px;
            border: none;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
          }

          .reset-btn:hover {
            transform: scale(1.05);
          }
        `}</style>
      </div>
    );
  }
}

export default IndianFoodQuiz;
