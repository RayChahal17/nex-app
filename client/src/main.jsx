// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for createRoot
import App from './App';
import './index.css';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <PersistGate persistor={persistor}>
         <ThemeProvider>
            <App />
         </ThemeProvider>
      </PersistGate>
   </Provider>
);
