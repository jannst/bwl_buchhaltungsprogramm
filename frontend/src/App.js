import React, {useEffect, useState} from 'react';
import {Menu, Dropdown } from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { RestfulProvider } from "restful-react";
import './App.css';
import { Accounts } from './pages/Accounts'
import {Home} from "./pages/Home";
import {Journal} from "./pages/Journal";
import {MainBook} from "./pages/MainBook";
import {OpenBalance} from "./pages/OpenBalance";
import {CloseBalance} from "./pages/CloseBalance";
import { SWRConfig } from 'swr'
import OperatingYearService from "./services/OpeningBalanceService";
import {Accounts2} from "./pages/Accounts2";


const fetcher = (...args) => fetch(window.$apiBase + args[0]).then((res) => res.json());

function App() {
    const [activeItem, handleItemClick] = useState('browse');
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
                    <Link to={"konten"}>
                        <Menu.Item
                            name='konten'
                            active={activeItem === 'konten'}
                            onClick={() => handleItemClick('konten')}>
                            Konten
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
                    <Link to={"hauptbuch"}>
                        <Menu.Item
                            name='hauptbuch'
                            active={activeItem === 'hauptbuch'}
                            onClick={() => handleItemClick('hauptbuch')}>
                            Hauptbuch
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
                            onChange={(e, {value}) => {setCurrentYear(value)}}
                        />
                        <Dropdown text='Commands' pointing='top' className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Item>Inbox</Dropdown.Item>
                                <Dropdown.Item>Starred</Dropdown.Item>
                                <Dropdown.Item>Sent Mail</Dropdown.Item>
                                <Dropdown.Item>Drafts (143)</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>Spam (1009)</Dropdown.Item>
                                <Dropdown.Item>Trash</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
                <div className="mainContainer">
                        <SWRConfig value={{ fetcher }}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/konten" component={() => <Accounts2 />} />
                        <Route exact path="/journal" component={Accounts2} />
                        <Route exact path="/hauptbuch" component={MainBook} />
                        <Route exact path="/eroeffnungsbilanz" component={() => <OpenBalance year={currentYear} />}/>
                        <Route exact path="/schlussbilanz" component={CloseBalance} />
                        </SWRConfig>
                </div>
            </Router>

    )
}

export default App;
