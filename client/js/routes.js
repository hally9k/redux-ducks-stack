import Github from 'components/github/github.container';
import Navigation from 'components/partial/navigation.component';
import Ping from 'components/ping.container';
import React from 'react';
import { Route } from 'react-router';
import StarWars from 'components/starwars.container';

export default
<div>
    <Route path="/" component={Navigation} />
    <Route path="/github" exact component={Github} />
    <Route path="/ping" exact component={Ping} />
    <Route path="/starwars" exact component={StarWars} />
</div>;
