import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import MainHeader from './components/MainHeader';
import "./main";
import Todos from './components/Todos';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainHeader/>}>
          <Route index element={<Login/>}/>
          <Route path="/login" index element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/todos" element={<Todos/>}/>
          <Route path='*' element={<Error/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;










// import React from "react";
// import "./main";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Error from "./components/Error";
// import { Route, Switch } from "react-router-dom";

// function App() {
  
//   return (
//       <div className="App">
//         <Switch>
//           <Route path="/login" component={Login} exact />
//           <Route path="/signup" component={Signup} />
//           <Route component={Error} />
//           {/* <Redirect from="/" to="/login" /> */}
//         </Switch>
//       </div>
//     );
// }

// export default App;
