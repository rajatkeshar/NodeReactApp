import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Root} from './components/root';

class App extends React.Component {
    render() {
        return(
            <Root/>
        );
    }
}
render(<App />, window.document.getElementById('app'));
