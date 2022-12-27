import './assets/scss/global.scss';
import { ContactIndex } from './views/ContactIndex'
import { Home } from './views/Home'
import { Statistic } from './views/Statistic'
import { ContactDetails } from './views/ContactDetails'
import { AppHeader } from './cmps/AppHeader'
import { ContactEdit } from './views/ContactEdit'
import { SignUp } from './views/SignUp'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { userService } from './services/user.service';

function App() {
    const loggedInUser = userService.query()
    return (
        <Router>
            <div className="main-app">
                <AppHeader />
                <main className='container'>
                    <Switch>
                        <Route path="/contact/edit/:id?" component={ContactEdit} />
                        <Route path="/contact/:id" component={ContactDetails} />
                        <Route path="/contact" component={ContactIndex} />
                        <Route path="/stats" component={Statistic} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/" component={Home} />

                    </Switch>
                </main>

                <footer>
                    <section className='container'>
                        MBTC Rights 2022 &copy;
                    </section>
                </footer>

            </div>
        </Router>
    );
}

export default App;
