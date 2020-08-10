import { Card, Button, Icon} from 'semantic-ui-react'
import React, { useState, useEffect } from "react";
import AccountService from "../services/AccountService";
import { AddAccount } from "./AddAccount"

export const Accounts = (props) => {
    const [accounts, setAccounts] = useState(null);

    useEffect(() => {
        retrieveAccounts();
    }, []);

    const retrieveAccounts = () => {
        AccountService.getAll(props.type)
            .then(response => {
                setAccounts(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const createAccount = (account) => {
        account.typ = props.type;
        AccountService.create(account).then(response => {
            retrieveAccounts();
        })
    }
    const updateAccount = (account) => {
        AccountService.update(account).then(response => {
            retrieveAccounts();
        })
    }

    const removeAccount = (id) => {
        AccountService.remove(id)
            .catch(e => {
                console.log(e);
            });

        let newAccounts = [];
        accounts.forEach((val) => {
            if (val.id !== id) {
                newAccounts.push(val);
            }
        });
        setAccounts(newAccounts);
    };

    return <div>
        <Card.Group>
            { accounts && accounts.map(function (account) {
                return(
                    <Card key={account.id}>
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
                        <Card.Content extra>

                        </Card.Content>
                    </Card>
                )
            })
            }
        </Card.Group>
        { accounts && <AddAccount
            callback={createAccount}
            accounts={accounts.map((val) => val.name)}
            trigger={<Button className="ui positive button">Konto hinzufügen</Button>}
        /> }

    </div>;
}