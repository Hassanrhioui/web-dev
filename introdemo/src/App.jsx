import React from 'react';
import './App.css'; // Import the CSS file

const Hello = (props) => {
  return (
    <div className="hello-card">
      <p className="hello-text">
        Hello <span className="highlight">{props.name}</span>, you are <span className="highlight">{props.age}</span> years old!
      </p>
      <p className="fun-fact">Did you know? {props.funFact}</p>
    </div>
  );
};

const App = () => {
  const people = [
    { name: 'Maya', age: 36, funFact: 'Maya loves hiking and has climbed 10 mountains!' },
    { name: 'Peter', age: 10, funFact: 'Peter is a chess champion in his school.' },
    { name: 'Luna', age: 28, funFact: 'Luna is a professional photographer who loves capturing sunsets.' },
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to the Greetings App!</h1>
        <p>Meet some amazing people and learn fun facts about them.</p>
      </header>

      <main className="main-content">
        {people.map((person, index) => (
          <Hello key={index} name={person.name} age={person.age} funFact={person.funFact} />
        ))}
      </main>

      <footer className="footer">
        <p>© 2023 Greetings App. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default App