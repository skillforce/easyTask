import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './styles/index.scss';
import {Provider} from "mobx-react";
import Filter from './stores/filter';
import Heroes from './stores/heroes';


const stores ={
    Filter,
    Heroes
}


ReactDOM.render(
    <React.StrictMode>
        <Provider {...stores}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

