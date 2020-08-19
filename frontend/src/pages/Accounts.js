import { Card, Button, Icon} from 'semantic-ui-react'
import React, { useState, useEffect } from "react";
import AccountService from "../services/AccountService";
import { AddAccount } from "./AddAccount"
import {AccountBookings} from "./AccountsBookings";

export const Accounts = (props) => {
    const [accounts, setAccounts] = useState(null);

    useEffect(() => {
        setAccounts(props.accounts);
    }, [props.accounts]);


    const updateAccount = (account) => {
        AccountService.update(account).then(response => {
            let newAccounts = [...accounts.map(acc => acc.id === account.id ? account : acc)];
            setAccounts(newAccounts);
        })
    }

    const removeAccount = (id) => {
        AccountService.remove(id)
            .catch(e => {
                console.log(e);
            });

        let newAccounts = [...accounts.filter(acc => acc.id !== id)];
        setAccounts(newAccounts);
    };

    return <Card.Group centered>
            { accounts && accounts.filter(acc => acc.typ === props.type).map(function (account) {
                return(
                    <Card key={account.id} fluid>
                        <Card.Content>
                            <Button.Group floated='right'>
                                <AddAccount
                                    callback={updateAccount}
                                    accounts={accounts.map((val) => val.name)}
                                    account={account}
                                    trigger={<Button className="compact icon"><Icon name="edit"/></Button>}
                                />
                                <Button className="compact icon" onClick={() => {removeAccount(account.id)}}>
                                    <Icon name="close"/>
                                </Button>
                            </Button.Group>
                            <Card.Header>{account.name}</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <AccountBookings
                                bookingOperationsSoll={props.bookingOpertions.filter(op => op.sollAccount === "/api/accounts/"+account.id)}
                                bookingOperationsHaben={props.bookingOpertions.filter(op => op.habenAccount === "/api/accounts/"+account.id)}
                                account={account}
                                accounts={accounts}
                            />
                        </Card.Content>
                    </Card>
                )
            })
            }
        </Card.Group>;
}