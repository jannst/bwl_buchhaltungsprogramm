import {Card, Button, Icon, Grid, Segment, Header, Form} from 'semantic-ui-react'
import React, { useState, useEffect } from "react";
import AccountService from "../services/AccountService";
import { AddAccount } from "./AddAccount"
import {AddBookingOperation} from "./AddBookingOperation";
import {Accounts} from "./Accounts";

export const Accounts2 = (props) => {
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
        AccountService.create(account).then(response => {
            retrieveAccounts();
        })
    }

    return <div>
        <Grid centered columns={2} celled='internally'>
            <Grid.Column>
                <Segment basic>
                    <Header as='h3' textAlign='center'>Aktivkonten</Header>
                    {accounts && <Accounts accounts={accounts.filter(acc => acc.typ === "active")}/>}
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment basic>
                    <Header as='h3' textAlign='center'>Passivkonten</Header>
                    {accounts && <Accounts type="passive" accounts={accounts.filter(acc => acc.typ === "passive")}/>}
                </Segment>
            </Grid.Column>
        </Grid>
        { <AddAccount
            callback={createAccount}
            trigger={<Button className="ui positive button">Konto hinzufügen</Button>}
        />
        }
        { <AddBookingOperation
            callback={createAccount}
            trigger={<Button className="ui positive button">Neuer Buchungssatz</Button>}
        />
        }

    </div>;
}