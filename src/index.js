import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you're using 'react-dom/client' in React 18
import { Provider } from 'react-redux';
import store, {persistor} from './store/store'; // Assuming this is the correct path to your Redux store
import App from './containers/App';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { environment } from './Environment';

const clientId = environment.CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <App persistor={persistor} />
      {/* </React.StrictMode> */}
    </Provider>
  </GoogleOAuthProvider>
);
