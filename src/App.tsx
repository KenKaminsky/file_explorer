import React from 'react';
import FileExplorer from './components/Explorer';
import { GlobalStyle } from './GlobalStyles';

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <FileExplorer />
    </div>
  );
}

export default App;
