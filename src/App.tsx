import { useState } from 'react'
import './App.css'

const zodiacSigns = [
  { name: 'Aries', dates: 'March 21 - April 19', element: 'Fire' },
  { name: 'Taurus', dates: 'April 20 - May 20', element: 'Earth' },
  { name: 'Gemini', dates: 'May 21 - June 20', element: 'Air' },
  { name: 'Cancer', dates: 'June 21 - July 22', element: 'Water' },
  { name: 'Leo', dates: 'July 23 - August 22', element: 'Fire' },
  { name: 'Virgo', dates: 'August 23 - September 22', element: 'Earth' },
  { name: 'Libra', dates: 'September 23 - October 22', element: 'Air' },
  { name: 'Scorpio', dates: 'October 23 - November 21', element: 'Water' },
  { name: 'Sagittarius', dates: 'November 22 - December 21', element: 'Fire' },
  { name: 'Capricorn', dates: 'December 22 - January 19', element: 'Earth' },
  { name: 'Aquarius', dates: 'January 20 - February 18', element: 'Air' },
  { name: 'Pisces', dates: 'February 19 - March 20', element: 'Water' }
]

function App() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null)
  const [horoscope, setHoroscope] = useState('')

  const generateHoroscope = (sign: string) => {
    const horoscopes: Record<string, string> = {
      'Aries': 'Today is a great day to start new projects. Your energy is high and your enthusiasm will be contagious.',
      'Taurus': 'Focus on stability and comfort today. A financial opportunity may present itself.',
      'Gemini': 'Your communication skills are enhanced today. It\'s a good time for important conversations.',
      'Cancer': 'Listen to your intuition today. Family matters may require your attention.',
      'Leo': 'Your creativity is at its peak. Don\'t be afraid to show your talents to the world.',
      'Virgo': 'Pay attention to details today. Your analytical skills will help solve a problem.',
      'Libra': 'Harmony and balance are highlighted today. Focus on relationships and partnerships.',
      'Scorpio': 'Your passion and determination will help you overcome obstacles today.',
      'Sagittarius': 'Adventure calls! Explore new ideas and don\'t be afraid to take calculated risks.',
      'Capricorn': 'Your discipline and hard work will pay off today. Career advances are possible.',
      'Aquarius': 'Your innovative ideas are especially valuable today. Share them with others.',
      'Pisces': 'Your compassion and intuition are heightened today. Trust your instincts.'
    }
    
    return horoscopes[sign] || ''
  }

  const handleSignSelect = (sign: string) => {
    setSelectedSign(sign)
    setHoroscope(generateHoroscope(sign))
  }

  return (
    <div className="container">
      <header>
        <h1>Daily Horoscope</h1>
        <p>Select your zodiac sign to see today's horoscope</p>
      </header>
      
      <div className="zodiac-grid">
        {zodiacSigns.map((sign) => (
          <div 
            key={sign.name} 
            className={`zodiac-card ${selectedSign === sign.name ? 'selected' : ''}`}
            onClick={() => handleSignSelect(sign.name)}
          >
            <h3>{sign.name}</h3>
            <p className="dates">{sign.dates}</p>
            <p className="element">Element: {sign.element}</p>
          </div>
        ))}
      </div>
      
      {selectedSign && horoscope && (
        <div className="horoscope-box">
          <h2>{selectedSign} Horoscope for Today</h2>
          <p className="horoscope-text">{horoscope}</p>
        </div>
      )}
    </div>
  )
}

export default App 