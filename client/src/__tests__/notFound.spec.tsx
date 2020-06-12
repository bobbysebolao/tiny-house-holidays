// Helpful article: https://medium.com/javascript-in-plain-english/the-practical-guide-to-start-react-testing-library-with-typescript-d386804a018

import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotFound } from '../sections/NotFound/index';

describe('<NotFound />', () => {
it('runs the example test', () => {
    expect(true).toBe(true);
  });

  it('shows not found message', () => {
    //Jsdom, the browser-like environment in which Jest runs, doesn't implement
    // all of the features and methods of the global 'window' object that
    // you'd have in a real browser. So to prevent an error we have to create 
    // an empty implementation for the 'window.scrollTo' method used by the 
    // custom 'useScrollToTop' dependency invoked in <NotFound />.
    const jsdomScrollTo = window.scrollTo;
    window.scrollTo = () => {};  // provide an empty implementation for window.scrollTo

    const result = render(<Router><NotFound /></Router>);
    expect(result.getByText('Uh oh! Something went wrong')).toBeInTheDocument();
    // expect(renderResult.getByText('The page you\'re looking for can\'t be found :(')).toBeInTheDocument();
  });
});
