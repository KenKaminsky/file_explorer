import React from 'react';
import FileExplorer from './components/Explorer';
import { GlobalStyle } from './GlobalStyles';
import data from './components/shared/mock_data';

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <FileExplorer data={data} />
    </div>
  );
}

export default App;
