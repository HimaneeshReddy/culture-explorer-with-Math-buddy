import React, { useState, useEffect } from 'react';
import { Sparkles, Home, Shirt, UtensilsCrossed, PartyPopper, Users, Award, ArrowRight, ArrowLeft, RotateCcw, Settings, Volume2, VolumeX, Zap, ZapOff, Menu } from 'lucide-react';
import kurta from "./assets/Visuals/kurta.png";
import saree from "./assets/Visuals/saree.jpg";
import IndianFoodQuiz from "./IndianFoodQuiz";

const CultureExplorer = () => {
  const [currentModule, setCurrentModule] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [animation, setAnimation] = useState('');
  const [showFoodQuiz, setShowFoodQuiz] = useState(false);
                                 
  // Settings for autism-friendly features
  const [settings, setSettings] = useState({
    animationsEnabled: true,
    soundEnabled: false,
    calmMode: false,
    showProgress: true
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // If showing food quiz, render only that component
  if (showFoodQuiz) {
    return (
      <div>
        <button
          onClick={() => setShowFoodQuiz(false)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '12px 24px',
            backgroundColor: '#f97316',
            color: 'white',
            borderRadius: '9999px',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 1000
          }}
        >
          ← Back to Culture Explorer
        </button>
        <IndianFoodQuiz />
      </div>
    );
  }

  // Data structure for all modules
  const modules = {
    greeting: {
      title: "🙏 Greeting: Namaste",
      icon: Sparkles,
      bgColor: "#fed7aa",
      borderColor: "#fdba74",
      slides: [
        {
          title: "How to Say Hello!",
          content: "In India, we greet people by saying 'Namaste' (nuh-muh-stay)",
          animation: "hands",
          visual: "👏"
        },
        {
          title: "How to Do Namaste",
          content: "Press your hands together in front of your chest and bow your head slightly",
          animation: "bow",
          visual: "🙏"
        },
        {
          title: "When to Use It",
          content: "Say Namaste when you meet elders, teachers, or friends!",
          animation: "wave",
          visual: "👋"
        }
      ]
    },
    clothes: {
      title: "👕 Traditional Clothes",
      icon: Shirt,
      bgColor: "#fbcfe8",
      borderColor: "#f9a8d4",
      slides: [
        {
          title: "Saree - Women's Dress",
          content: "A saree is a long, colorful cloth that women wrap around themselves",
          animation: "spin",
          visual:  <div>
      <img src={saree} alt="Saree" />
    </div>
          
        },
        {
          title: "Kurta - For Everyone",
          content: "A kurta is a comfortable, long shirt worn by both men and women",
          animation: "pulse",
          visual:   <div>
      <img src={kurta} alt="Kurta" />
    </div>
        }
      ]
    },
     food: {
  title: "🍛 Indian Food",
  icon: UtensilsCrossed,
  bgColor: "#fef3c7",
  borderColor: "#fde047",
  slides: [
    {
      title: "Rice 🍚",
      content: "Rice is a staple food eaten all over India, especially in South India, East India, and North-East India.",
      animation: "bounce",
      visual: "🍚"
    },
    {
      title: "Naan 🫓",
      content: "Naan is a soft bread originally from North India, commonly eaten with curries like butter chicken.",
      animation: "flip",
      visual: "🫓"
    },
    {
      title: "Chicken Curry 🍗",
      content: "Chicken curry is popular across North India and Punjab. It is cooked with spices, onions, and tomatoes.",
      animation: "pulse",
      visual: "🍗"
    },
    {
      title: "Mirchi (Chilli) 🌶️",
      content: "Mirchi is widely used in South Indian and Andhra cuisine. It adds spice and flavor to food.",
      animation: "bounce",
      visual: "🌶️"
    },
    {
      title: "Extra: Dosa 🥞",
      content: "Dosa comes from South India. It is a thin crispy pancake made from rice and lentils.",
      animation: "spin",
      visual: "🥞"
    }
  ]
}

    ,
    festivals: {
      title: "🎉 Festivals",
      icon: PartyPopper,
      bgColor: "#e9d5ff",
      borderColor: "#d8b4fe",
      slides: [
        {
          title: "Diwali - Festival of Lights",
          content: "Diwali celebrates the victory of light over darkness. Families light diyas (small lamps)!",
          animation: "diya",
          visual: "🪔"
        },
        {
          title: "Holi - Festival of Colors",
          content: "Holi is a fun festival where people play with colored powder and water!",
          animation: "colors",
          visual: "🎨"
        },
        {
          title: "Pongal - Harvest Festival",
          content: "Pongal is a harvest festival where people thank the Sun God for good crops. They cook sweet rice!",
          animation: "bounce",
          visual: "🌾"
        },
        {
          title: "Bhogi - New Beginnings",
          content: "Bhogi is the first day of Pongal. People light bonfires and throw away old things to start fresh!",
          animation: "diya",
          visual: "🔥"
        },
        {
          title: "Onam - Kerala's Harvest",
          content: "Onam is celebrated in Kerala with flower carpets, boat races, and delicious feasts!",
          animation: "pulse",
          visual: "🌺"
        },
        {
          title: "Navratri - Nine Nights of Dance",
          content: "Navratri celebrates the divine feminine with nine nights of dancing, music, and colorful garba!",
          animation: "spin",
          visual: "💃"
        },
        {
          title: "Raksha Bandhan - Brother-Sister Love",
          content: "Sisters tie a special thread (rakhi) on their brothers' wrists as a symbol of love and protection!",
          animation: "pulse",
          visual: "🎀"
        },
        {
          title: "Eid - Festival of Joy",
          content: "Eid is celebrated after Ramadan with prayers, delicious sweets, and giving to those in need!",
          animation: "bounce",
          visual: "🌙"
        }
      ]
    },
    home: {
      title: "🏠 Indian Homes",
      icon: Home,
      bgColor: "#bbf7d0",
      borderColor: "#86efac",
      slides: [
        {
          title: "Joint Family",
          content: "Many Indian families live together - grandparents, parents, children, uncles, and aunts all in one home!",
          animation: "family",
          visual: "👨‍👩‍👧‍👦"
        },
        {
          title: "Daily Routine",
          content: "Wake up → Pray → Breakfast → School/Play → Lunch → Rest → Evening prayer → Dinner → Sleep",
          animation: "routine",
          visual: "⏰"
        }
      ]
    }
  };

  const allQuizData = [
    {
      festival: "Diwali",
      emoji: "🪔",
      matches: ["Lights", "Diyas", "Lamps"],
      description: "Festival of Lights"
    },
    {
      festival: "Holi",
      emoji: "🎨",
      matches: ["Colors", "Powder", "Water"],
      description: "Festival of Colors"
    },
    {
      festival: "Pongal",
      emoji: "🌾",
      matches: ["Harvest", "Rice", "Sun"],
      description: "Harvest Festival"
    }
  ];

  const matchingItems = [
    { id: 1, text: "Lights" },
    { id: 2, text: "Colors" },
    { id: 3, text: "Harvest" },
    { id: 4, text: "Diyas" },
    { id: 5, text: "Powder" },
    { id: 6, text: "Rice" }
  ];

  const quizData = allQuizData;

  const handleQuizAnswer = (festival, answer) => {
    setQuizAnswers({ ...quizAnswers, [festival]: answer });
  };

  const submitQuiz = () => {
    let correctCount = 0;
    quizData.forEach((item) => {
      if (item.matches.includes(quizAnswers[item.festival])) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  const selectModule = (module) => {
    setCurrentModule(module);
    setCurrentSlide(0);
    setShowMenu(false);
  };

  const nextSlide = () => {
    if (currentSlide < modules[currentModule].slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentModuleData = modules[currentModule];
  const ModuleIcon = currentModuleData.icon;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '24px', position: 'relative' }}>
      {/* Settings Toggle */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '12px',
          backgroundColor: 'white',
          borderRadius: '50%',
          border: '2px solid #e5e7eb',
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 1000
        }}
      >
        <Settings style={{ width: '24px', height: '24px', color: '#374151' }} />
      </button>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '12px',
          backgroundColor: 'white',
          borderRadius: '50%',
          border: '2px solid #e5e7eb',
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          display: window.innerWidth < 768 ? 'block' : 'none'
        }}
      >
        <Menu style={{ width: '24px', height: '24px', color: '#374151' }} />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 999,
          minWidth: '250px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>Settings</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ color: '#374151' }}>Animations</span>
              <button
                onClick={() => setSettings({ ...settings, animationsEnabled: !settings.animationsEnabled })}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: settings.animationsEnabled ? '#22c55e' : '#e5e7eb',
                  color: settings.animationsEnabled ? 'white' : '#6b7280',
                  cursor: 'pointer'
                }}
              >
                {settings.animationsEnabled ? <Zap style={{ width: '20px', height: '20px' }} /> : <ZapOff style={{ width: '20px', height: '20px' }} />}
              </button>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ color: '#374151' }}>Sound</span>
              <button
                onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: settings.soundEnabled ? '#22c55e' : '#e5e7eb',
                  color: settings.soundEnabled ? 'white' : '#6b7280',
                  cursor: 'pointer'
                }}
              >
                {settings.soundEnabled ? <Volume2 style={{ width: '20px', height: '20px' }} /> : <VolumeX style={{ width: '20px', height: '20px' }} />}
              </button>
            </label>
          </div>
        </div>
      )}

      {/* Module Navigation */}
      <div style={{
        display: showMenu || window.innerWidth >= 768 ? 'grid' : 'none',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        maxWidth: '1200px',
        margin: '0 auto 32px',
        padding: window.innerWidth < 768 ? '60px 0 0 0' : '0'
      }}>
        {Object.entries(modules).map(([key, module]) => {
          const Icon = module.icon;
          return (
            <button
              key={key}
              onClick={() => selectModule(key)}
              style={{
                padding: '20px',
                backgroundColor: currentModule === key ? module.bgColor : 'white',
                border: `4px solid ${module.borderColor}`,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: currentModule === key ? 'scale(1.05)' : 'scale(1)',
                boxShadow: currentModule === key ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                <Icon style={{ width: '32px', height: '32px', color: '#374151' }} />
                <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937' }}>
                  {module.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Slide Display */}
        <div style={{ 
          backgroundColor: currentModuleData.bgColor,
          border: `4px solid ${currentModuleData.borderColor}`,
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 'bold',
              color: '#1f2937',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <ModuleIcon style={{ width: '56px', height: '56px' }} />
              {currentModuleData.slides[currentSlide].title}
            </h1>

            <div style={{ fontSize: '128px', margin: '24px 0' }}>
              {typeof currentModuleData.slides[currentSlide].visual === 'string' 
                ? currentModuleData.slides[currentSlide].visual 
                : currentModuleData.slides[currentSlide].visual}
            </div>

            <p style={{ 
              fontSize: '28px',
              color: '#374151',
              maxWidth: '800px',
              lineHeight: '1.6'
            }}>
              {currentModuleData.slides[currentSlide].content}
            </p>
          </div>

          {/* Navigation Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '40px',
            gap: '16px'
          }}>
            <button
              onClick={previousSlide}
              disabled={currentSlide === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: currentSlide === 0 ? '#d1d5db' : '#f97316',
                color: currentSlide === 0 ? '#6b7280' : 'white',
                transition: 'all 0.3s'
              }}
            >
              <ArrowLeft style={{ width: '24px', height: '24px' }} />
              Previous
            </button>

            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#374151' }}>
              {currentSlide + 1} / {currentModuleData.slides.length}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === currentModuleData.slides.length - 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '18px',
                border: 'none',
                cursor: currentSlide === currentModuleData.slides.length - 1 ? 'not-allowed' : 'pointer',
                backgroundColor: currentSlide === currentModuleData.slides.length - 1 ? '#d1d5db' : '#f97316',
                color: currentSlide === currentModuleData.slides.length - 1 ? '#6b7280' : 'white',
                transition: 'all 0.3s'
              }}
            >
              Next
              <ArrowRight style={{ width: '24px', height: '24px' }} />
            </button>
          </div>
        </div>

        {/* Food Quiz Button - Only show when on food module */}
        {currentModule === 'food' && (
          <div style={{ 
            backgroundColor: 'white', 
            border: '4px solid #fde047', 
            borderRadius: '24px', 
            padding: '32px',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              color: '#ca8a04',
              marginBottom: '16px'
            }}>
              🍽️ Test Your Knowledge!
            </h2>
            <p style={{ 
              fontSize: '20px', 
              color: '#374151', 
              marginBottom: '24px' 
            }}>
              Ready to see how much you've learned about Indian food? Take the quiz!
            </p>
            <button
              onClick={() => setShowFoodQuiz(true)}
              style={{
                padding: '16px 32px',
                backgroundColor: '#f59e0b',
                color: 'white',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '20px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <UtensilsCrossed style={{ width: '24px', height: '24px' }} />
              Start Food Quiz
              <ArrowRight style={{ width: '24px', height: '24px' }} />
            </button>
          </div>
        )}

        {/* Quiz Section */}
        <div style={{ backgroundColor: 'white', border: '4px solid #d8b4fe', borderRadius: '24px', padding: '32px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#9333ea',
            marginBottom: '24px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <Award style={{ width: '40px', height: '40px' }} />
            Festival Quiz!
            <Award style={{ width: '40px', height: '40px' }} />
          </h2>
          
          {!quizSubmitted ? (
            <>
              <p style={{ fontSize: '20px', color: '#374151', marginBottom: '32px', textAlign: 'center' }}>
                Match each festival with what makes it special!
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {quizData.map((item) => (
                  <div key={item.festival} style={{ backgroundColor: '#faf5ff', borderRadius: '16px', padding: '24px', border: '2px solid #e9d5ff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '72px' }}>{item.emoji}</span>
                      <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{item.festival}</h3>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                      {matchingItems.map((matchItem) => (
                        <button
                          key={matchItem.id}
                          onClick={() => handleQuizAnswer(item.festival, matchItem.text)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            border: quizAnswers[item.festival] === matchItem.text ? 'none' : '2px solid #e9d5ff',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            backgroundColor: quizAnswers[item.festival] === matchItem.text ? '#9333ea' : 'white',
                            color: quizAnswers[item.festival] === matchItem.text ? 'white' : '#374151',
                            transform: quizAnswers[item.festival] === matchItem.text ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: quizAnswers[item.festival] === matchItem.text ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
                          }}
                        >
                          {matchItem.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < quizData.length}
                style={{
                  marginTop: '32px',
                  display: 'block',
                  margin: '32px auto 0',
                  padding: '16px 32px',
                  borderRadius: '9999px',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  border: 'none',
                  cursor: Object.keys(quizAnswers).length < quizData.length ? 'not-allowed' : 'pointer',
                  backgroundColor: Object.keys(quizAnswers).length < quizData.length ? '#d1d5db' : '#9333ea',
                  color: Object.keys(quizAnswers).length < quizData.length ? '#6b7280' : 'white',
                  transition: 'all 0.3s',
                  boxShadow: Object.keys(quizAnswers).length < quizData.length ? 'none' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                Submit Quiz
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '128px', marginBottom: '24px' }}>
                {score === quizData.length ? '🎉' : score > 0 ? '👍' : '💪'}
              </div>
              <h3 style={{ fontSize: '40px', fontWeight: 'bold', color: '#9333ea', marginBottom: '16px' }}>
                You got {score} out of {quizData.length} correct!
              </h3>
              <p style={{ fontSize: '24px', color: '#374151', marginBottom: '32px' }}>
                {score === quizData.length
                  ? 'Amazing work! You know your festivals!'
                  : score > 0
                  ? 'Good job! Keep learning!'
                  : 'Try again! You can do it!'}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {quizData.map((item) => {
                  const isCorrect = item.matches.includes(quizAnswers[item.festival]);
                  return (
                    <div
                      key={item.festival}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: isCorrect ? '#d1fae5' : '#fee2e2',
                        border: `2px solid ${isCorrect ? '#6ee7b7' : '#fca5a5'}`
                      }}
                    >
                      <p style={{ fontSize: '20px', color: '#1f2937' }}>
                        <span style={{ fontSize: '36px', marginRight: '8px' }}>{item.emoji}</span>
                        <strong>{item.festival}:</strong> {quizAnswers[item.festival]}
                        {isCorrect ? ' ✅' : ` ❌ (Correct: ${item.matches.join(', ')})`}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={resetQuiz}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '0 auto',
                  padding: '16px 32px',
                  backgroundColor: '#9333ea',
                  color: 'white',
                  borderRadius: '9999px',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <RotateCcw style={{ width: '24px', height: '24px' }} />
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        * {
          color-scheme: light;
        }
      `}</style>
    </div>
  );
};

export default CultureExplorer;
