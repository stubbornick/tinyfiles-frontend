import React from 'react';

import logo from './logo.svg';
import './App.css';
import { FileModule } from './FileModule';

export function App(): JSX.Element {
  return (
    <div className="App">
      <header className="border-bottom">
        <h1>Tinyfiles</h1>
      </header>

      <FileModule />

      <footer className="pt-2 my-md-3 pt-md-3 border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img className="mb-2" src={logo} alt="" width="24" height="24" />
              <small className="d-block mb-3 text-muted">&copy; 2020</small>
            </div>
            <div className="col-md-6">
              <h5>About</h5>
              <ul className="list-unstyled text-muted">
                <li>
                  Icon made by&nbsp;
                  <a
                    href="https://www.flaticon.com/authors/freepik"
                    title="Freepik"
                  >
                    Freepik
                  </a>
                </li>
                <li>
                  App made by&nbsp;
                  <a href="https://github.com/stubbornick" title="stubbornick">
                    stubbornick
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
