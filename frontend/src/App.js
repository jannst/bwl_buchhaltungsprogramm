import React, {useState} from 'react';
import {Segment, Sidebar, Menu, Dropdown, Container} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import { Accounts } from './pages/Accounts'
import {Home} from "./pages/Home";
import {Journal} from "./pages/Journal";
import {MainBook} from "./pages/MainBook";
import {OpenBalance} from "./pages/OpenBalance";
import {CloseBalance} from "./pages/CloseBalance";

const apiBaseUrl = "http://localhost:8080/api";

const handleItemClick = (e, {name}) => this.setState({activeItem: name})

function App() {
    const [activeItem, handleItemClick] = useState('browse');

    return (
        <Router>
            <Menu fixed="top">
                <Dropdown text='Konten' pointing='top' className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            name='konten'
                            active={activeItem === 'konten'}
                            onClick={() => handleItemClick('konten')}>
                            <Link to={"aktivkonten"}>Aktivkonten</Link>
                        </Dropdown.Item>
                        <Dropdown.Item
                            name='konten'
                            active={activeItem === 'konten'}
                            onClick={() => handleItemClick('konten')}>
                            <Link to={"passivkonten"}>Passivkonten</Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item
                    name='journal'
                    active={activeItem === 'journal'}
                    onClick={() => handleItemClick('journal')}>
                    <Link to={"journal"}>Journal</Link>
                </Menu.Item>
                <Menu.Item
                    name='hauptbuch'
                    active={activeItem === 'hauptbuch'}
                    onClick={() => handleItemClick('hauptbuch')}>
                    <Link to={"hauptbuch"}>Hauptbuch</Link>
                </Menu.Item>
                <Menu.Item
                    name='openBalance'
                    active={activeItem === 'openBalance'}
                    onClick={() => handleItemClick('openBalance')}>
                    <Link to={"eroeffnungsbilanz"}>Eröffnungsbilanz</Link>
                </Menu.Item>
                <Menu.Item
                    name='closeBalance'
                    active={activeItem === 'closeBalance'}
                    onClick={() => handleItemClick('closeBalance')}>
                    <Link to={"schlussbilanz"}>Schlussbilanz</Link>
                </Menu.Item>
                <Menu.Menu position='right' className="menuRight">
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
            <Route exact path="/" component={Home} />
            <Route exact path="/aktivkonten" component={() => <Accounts type='active' />} />
            <Route exact path="/passivkonten" component={() => <Accounts type='passive' />} />
            <Route exact path="/journal" component={Journal} />
            <Route exact path="/hauptbuch" component={MainBook} />
            <Route exact path="/eroeffnungsbilanz" component={OpenBalance} />
            <Route exact path="/schlussbilanz" component={CloseBalance} />
            </div>
        </Router>
    )
}

export default App;
