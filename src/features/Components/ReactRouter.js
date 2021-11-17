import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import EpisodeDetail from './EpisodeDetail';
import EpisodesList from './EpisodesList';
import Home from './Home';
import EpisodeNew from '../episodeData/EpisodeNew'
import Error404 from './Error404';

export default function ReactRouter() {
    return (
        <Router>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/episodes" component={EpisodesList} />
                <Route exact path="/detail/:id" component={EpisodeDetail} />
                <Route exact path="/episode-new" component={EpisodeNew} />
                <Route exact path="/*" component={Error404} />
            </Switch>
        </Router>

    )
}
