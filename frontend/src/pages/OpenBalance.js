import React, {useEffect, useState} from "react";
import AccountService from "../services/AccountService";
import OpeningBalanceService from "../services/OpeningBalanceService";
import {Button, Grid, Form, Input, Segment, Header, Message} from "semantic-ui-react";

export const OpenBalance = (props) => {
    const [accounts, setAccounts] = useState(null);
    const [openingBalances, setOpeningBalances] = useState(null);

    useEffect(() => {
        retrieveOpeningBalances();
    }, []);

    const numberRegexp = /^\d{1,10}[.]?\d{0,10}$/;
    const changeHandler = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        let newOpeningBalances = {};
        for (let arrKey in openingBalances) {
            newOpeningBalances[arrKey] = openingBalances[arrKey];
        }
        if(key in openingBalances) {
            if(numberRegexp.test(value)) {
                let balanceToUpdate = Object.assign({}, newOpeningBalances[key]);
                balanceToUpdate.amount = parseFloat(value);
                OpeningBalanceService.update(balanceToUpdate);
            }
            newOpeningBalances[key].amount = value;
        }
        setOpeningBalances(newOpeningBalances);
    }

    const retrieveOpeningBalances = () => {
        AccountService.getAll()
            .then(accounts => {
                setAccounts(accounts.data);
                OpeningBalanceService.getAll(props.year)
                    .then(openingBalances => {
                        let mappedOpeningBalances = openingBalances.data.reduce(function(accum, currentVal) {
                            accum[currentVal.account.split('/').slice(-1)[0]] = currentVal;
                            return accum;
                        }, {});
                        let foundAccountWithoutBalance = false;
                        accounts.data.forEach(account => {
                            if(!(account.id in mappedOpeningBalances)) {
                                OpeningBalanceService.create({
                                    "amount": 0,
                                    "account": "/api/accounts/"+account.id,
                                    "year": props.year
                                });
                                foundAccountWithoutBalance = true;
                            }
                        });
                        if(foundAccountWithoutBalance) {
                            retrieveOpeningBalances();
                        } else {
                            setOpeningBalances(mappedOpeningBalances);
                        }
                    });
            })
            .catch(e => {
                console.log(e);
            });
    };

    const getErrorMessage = (value) => {
        if(!numberRegexp.test(value)) {
            return "Wert muss eine Zahl > 0 sein, die nicht länder als 10 Zeichen ist";
        }
    }

    const ValidationMessage = () => {
        if(accounts && openingBalances) {
            let balance = 0;
            accounts.forEach(account => {
                let val = openingBalances[account.id].amount;
                if (numberRegexp.test(val)) {
                    if (account.typ === "active") {
                        balance += val;
                    } else {
                        balance -= val;
                    }
                }
            });
            if (balance < 0.00001 && balance > -0.00001) {
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
                            {balance > 0 ? "Aktivseite" : "Passivseite"} um {Math.abs(balance).toFixed(2)}€ zu groß!
                        </p>
                    </Message>
                );
            }
        }
        return null;
    }

    return <div>
        <h3>Eröffnungsbilanz { props.year }</h3>
        <Segment basic>
            <Form>
            <Grid centered columns={3} celled='internally'>
                <Grid.Column>
                    <Segment>
                        <Header as='h3' textAlign='center'>Aktivkonten</Header>
                            { accounts && openingBalances && accounts.filter(acc => acc.typ === "active").map(function (account) {
                                return (
                                    <Form.Field
                                        label={account.name+" (Soll)"}
                                        control='input'
                                        placeholder={account.name+" (Soll)"}
                                        name={account.id}
                                        error={getErrorMessage(openingBalances[account.id].amount)}
                                        onChange={changeHandler}
                                        value={openingBalances[account.id].amount}
                                    />
                                );
                            })
                            }
                    </Segment>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Header as='h3' textAlign='center'>Validierung</Header>
                    <ValidationMessage />
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Header as='h3' textAlign='center'>Passivkonten</Header>
                            { accounts && openingBalances && accounts.filter(acc => acc.typ === "passive").map(function (account) {
                                return (
                                    <Form.Field
                                        label={account.name+" (Haben)"}
                                        control='input'
                                        placeholder={account.name+" (Haben)"}
                                        name={account.id}
                                        error={getErrorMessage(openingBalances[account.id].amount)}
                                        onChange={changeHandler}
                                        value={openingBalances[account.id].amount}
                                    />
                                );
                            })
                            }
                    </Segment>
                </Grid.Column>
            </Grid>
        </Form>
        </Segment>
    </div>;
};