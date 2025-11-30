import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';

const AppTest: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <h1>Test App - Basic Functionality</h1>
        <p>If you can see this, React is working!</p>
      </div>
    </ThemeProvider>
  );
};

export default AppTest;