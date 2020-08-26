import React, {useEffect, useState} from "react";
import AccountService from "../services/AccountService";
import OpeningBalanceService from "../services/OpeningBalanceService";
import {Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import BookingOperationService from "../services/BookingOperationService";

export const CloseBalance = (props) => {
    const [balances, setBalances] = useState(null);
    const [activeBalance, setActiveBalance] = useState(0);
    const [passiveBalance, setPassiveBalance] = useState(0);
    const [accounts, setAccounts] = useState(null);
    const [openingBalances, setOpeningBalances] = useState(null);
    const [bookingOperations, setBookingOperations] = useState(null);
    const [profit, setProfit] = useState(null);

    const retrieveOpeningBalances = () => {
        OpeningBalanceService.getAll(props.year)
            .then(response => {
                setOpeningBalances(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveBookingOperations = () => {
        BookingOperationService.getAll(props.year)
            .then(response => {
                setBookingOperations(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveAccounts = () => {
        AccountService.getAll(props.type)
            .then(response => {
                setAccounts(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const ValidationMessage = () => {
        if (activeBalance === passiveBalance) {
            return (
                <Message positive>
                    <Message.Header>Aktiv- und Passivseite gleich</Message.Header>
                </Message>
            );
        } else {
            return (
                <Message negative>
                    <Message.Header>Aktiv- und Passivseite nicht gleich</Message.Header>
                    <p>
                        {activeBalance > passiveBalance ? "Aktivseite" : "Passivseite"} um {Math.abs(activeBalance - passiveBalance).toFixed(2)}€ zu groß!
                    </p>
                </Message>
            );
        }
    }

    const Profit = () => {
        if(profit === null) {
            return (<Message negative>
                <Message.Header>Passivkonto "Eigenkapital" ist nicht definiert</Message.Header>
                <p>Bitte ein Passivkonto mit dem Namen "Eigenkapital" erstellen, um Gewinnberechnung durchzuführen</p>
            </Message>
            );
        }
        if (profit >= 0) {
            return (
                <Message positive>
                    <Message.Header>{profit}€ Gewinn</Message.Header>
                </Message>
            );
        } else {
            return (
                <Message negative>
                    <Message.Header>{profit}€ Verlust</Message.Header>
                </Message>
            );
        }
    }

    const calculateBalances = () => {
        let accountBalances = {};
        let activeBalance = 0;
        let passiveBalance = 0;
        let profit = null;

        accounts.forEach(account => {
            let accId = "/api/accounts/"+account.id;
            let openingBalance = openingBalances.filter(openingBalance => openingBalance.account === accId)[0];
            let sollAmount = bookingOperations.filter(op => op.sollAccount === accId).map(op => op.amount).reduce(function(pv, cv) { return pv + cv; }, 0);
            let habenAmount = bookingOperations.filter(op => op.habenAccount === accId).map(op => op.amount).reduce(function(pv, cv) { return pv + cv; }, 0);
            let result = (openingBalance ? openingBalance.amount : 0) + (account.typ === "active" ? sollAmount - habenAmount : habenAmount - sollAmount);
            accountBalances[account.id] = result > 0 ? <span style={{color: "green", float:  "right"}}>{result}€</span> : <span style={{color: "red", float: "right"}}>{result}€</span>;
            if(account.typ === "active")
                activeBalance += result;
            else
                passiveBalance += result;
            if(account.name === "Eigenkapital" && account.typ === "passive") {
                profit = result - (openingBalance ? openingBalance.amount : 0);
            }
        });
        setBalances(accountBalances);
        setActiveBalance(activeBalance);
        setPassiveBalance(passiveBalance);
        setProfit(profit);
    }

    useEffect(() => {
        if(!openingBalances)
            retrieveOpeningBalances();
        if(!bookingOperations)
            retrieveBookingOperations();
        if(!accounts)
            retrieveAccounts();
        if(accounts && bookingOperations && openingBalances && !balances) {
            calculateBalances();
        }
    }, [accounts, openingBalances, bookingOperations]);

    return <div>
        <h3>Schlussbilanz { props.year }</h3>
        <Segment basic>
                <Grid centered columns={3} celled='internally'>
                    <Grid.Column>
                        <Segment>
                            <Header as='h3' textAlign='center'>Aktivkonten</Header>
                            { balances && accounts.filter(acc => acc.typ === "active").map(function (account) {
                                return (
                                    <Grid.Row>
                                        {account.name}: <span style={{float: "right"}}>{balances[account.id]}</span>
                                    </Grid.Row>
                                );
                            })
                            }
                            <hr/>
                            {
                                activeBalance >= 0 ? <span style={{color: "green", float:  "right"}}>{activeBalance}€</span> : <span style={{color: "red", float: "right"}}>{activeBalance}€</span>
                            }
                            <br />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        {accounts && bookingOperations && openingBalances && balances &&
                            <div>
                            < Header as = 'h3' textAlign='center'>Validierung</Header>
                            <ValidationMessage />
                            <Header as='h3' textAlign='center'>Gewinn</Header>
                            <Profit />
                            </div>
                            }
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Header as='h3' textAlign='center'>Passivkonten</Header>
                            { balances && accounts.filter(acc => acc.typ === "passive").map(function (account) {
                                return (
                                    <Grid.Row>
                                        {account.name}: {balances[account.id]}
                                    </Grid.Row>
                                );
                            })
                            }
                            <hr/>
                            {
                                passiveBalance >= 0 ? <span style={{color: "green", float:  "right"}}>{passiveBalance}€</span> : <span style={{color: "red", float: "right"}}>{passiveBalance}€</span>
                            }
                            <br />
                        </Segment>
                    </Grid.Column>
                </Grid>
        </Segment>
    </div>;
};