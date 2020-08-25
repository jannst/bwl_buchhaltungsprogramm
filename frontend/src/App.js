import React, {useEffect, useState} from 'react';
import {Menu, Dropdown } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import {Home} from "./pages/Home";
import {Journal} from "./pages/Journal";
import {OpenBalance} from "./pages/OpenBalance";
import {CloseBalance} from "./pages/CloseBalance";
import { SWRConfig } from 'swr'
import {Accounts2} from "./pages/Accounts2";
import  Cookies from 'universal-cookie';
import http from "./http-common";


const fetcher = (...args) => fetch(window.$apiBase + args[0]).then((res) => res.json());

function App() {
    const cookies = new Cookies();
    const [activeItem, handleItemClick] = useState('browse');
    const [currentYear, setCurrentYear] = useState(cookies.get("year") ? parseInt(cookies.get("year")): new Date().getFullYear());

    const getYears = () => {
        let res = [];
        let year = new Date().getFullYear();
        for(let i = year-50; i <= year+10; i++) {
            res.push({ key: i, value: i, text: i })
        }
        return res;
    }

    return (
            <Router>
                <Menu fixed="top">
                    <Link to={"hauptbuch"}>
                        <Menu.Item
                            name='hauptbuch'
                            active={activeItem === 'hauptbuch'}
                            onClick={() => handleItemClick('hauptbuch')}>
                            Hauptbuch
                        </Menu.Item>
                    </Link>
                    <Link to={"journal"}>
                        <Menu.Item
                            name='journal'
                            active={activeItem === 'journal'}
                            onClick={() => handleItemClick('journal')}>
                            Journal
                        </Menu.Item>
                    </Link>
                    <Link to={"eroeffnungsbilanz"}>
                        <Menu.Item
                            name='openBalance'
                            active={activeItem === 'openBalance'}
                            onClick={() => handleItemClick('openBalance')}>
                            Eröffnungsbilanz
                        </Menu.Item>
                    </Link>
                    <Link to={"schlussbilanz"}>
                        <Menu.Item
                            name='closeBalance'
                            active={activeItem === 'closeBalance'}
                            onClick={() => handleItemClick('closeBalance')}>
                            Schlussbilanz
                        </Menu.Item>
                    </Link>
                    <Menu.Menu position='right' className="menuRight">

                        <Dropdown
                            placeholder='Geschäftsjahr'
                            item scrolling
                            options={getYears()}
                            value={currentYear}
                            onChange={(e, {value}) => {
                                cookies.set('year', value, { path: '/' });
                                setCurrentYear(value);
                            }}
                        />
                        <Dropdown text='Commands' pointing='top' className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => {
                                        http.get("database/clear").then(() => {
                                            window.location.reload();
                                        });
                                    }}
                                >
                                    Datenbank leeren
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        http.get("database/fixtures_load").then(() => {
                                            window.location.reload();
                                        });
                                    }}
                                >
                                    Demodaten laden
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
                <div className="mainContainer">
                        <SWRConfig value={{ fetcher }}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/hauptbuch" component={() => <Accounts2 year={currentYear}/>} />
                        <Route exact path="/journal" component={() => <Journal year={currentYear} />}/>
                        <Route exact path="/eroeffnungsbilanz" component={() => <OpenBalance year={currentYear} />}/>
                        <Route exact path="/schlussbilanz" component={() => <CloseBalance year={currentYear} />} />
                        </SWRConfig>
                </div>
            </Router>

    )
}

export default App;
