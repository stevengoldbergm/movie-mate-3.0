

import {setContext} from 'apollo/client/link/context';
import {BrowserRouter as Router, Routes}

import Text from './pages/test'

const authLink = setContext((_, {headers}))

function App() {
  return (
    <>
    hello
    <Test />
    </>
   
  );
}

export default App;
