import './assets/scss/global.scss';
import { ContactIndex } from './views/ContactIndex'
import { Home } from './views/Home'
import { Statistic } from './views/Statistic'
import { ContactDetails } from './views/ContactDetails'
import { AppHeader } from './cmps/AppHeader'
import { ContactEdit } from './views/ContactEdit'
import { SignUp } from './views/SignUp'

import { HashRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { userService } from './services/user.service';

function PrivateRoute(cmp) {
    const user = userService.query()
    return user ? cmp : <Navigate to="/signup" />
}

function App() {
    return (
        <Router>
            <div className="main-app">
                <AppHeader />
                <main className='container'>
                    <Routes>
                        <Route path="/contact/edit/:id?" element={PrivateRoute(<ContactEdit />)} />
                        <Route path="/contact/edit/" element={PrivateRoute(<ContactEdit />)} />
                        <Route path="/contact/:id" element={PrivateRoute(<ContactDetails />)} />
                        <Route path="/contact" element={<ContactIndex />} />
                        <Route path="/stats" element={<Statistic />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={PrivateRoute(<Home />)} />
                    </Routes>
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
