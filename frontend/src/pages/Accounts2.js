import { Button, Grid, Segment, Header } from 'semantic-ui-react'
import React, { useState, useEffect } from "react";
import AccountService from "../services/AccountService";
import { AddAccount } from "./AddAccount"
import {AddBookingOperation} from "./AddBookingOperation";
import {Accounts} from "./Accounts";
import BookingOperationService from "../services/BookingOperationService";

export const Accounts2 = (props) => {
    const [accounts, setAccounts] = useState(null);
    const [bookingOperations, setBookingOperations] = useState(null);

    useEffect(() => {
        retrieveAccounts();
        retrieveBookingOperations();
    }, []);


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

    const createAccount = (account) => {
        AccountService.create(account).then(response => {
            retrieveAccounts();
        })
    }
    const createBuchungssatz = (bookingOperation) => {
        BookingOperationService.create(bookingOperation).then(resp => {
            retrieveBookingOperations()
            //setBookingOperations([]);
        });
    }

    return <div>
        <Grid centered columns={2} celled='internally'>
            <Grid.Column>
                <Segment basic>
                    <Header as='h3' textAlign='center'>Aktivkonten</Header>
                    {accounts && bookingOperations && <Accounts year={props.year} bookingOpertions={bookingOperations} accounts={accounts.filter(acc => acc.typ === "active")}/>}
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment basic>
                    <Header as='h3' textAlign='center'>Passivkonten</Header>
                    {accounts && bookingOperations && <Accounts year={props.year} type="passive" bookingOpertions={bookingOperations} accounts={accounts.filter(acc => acc.typ === "passive")}/>}
                </Segment>
            </Grid.Column>
        </Grid>
        { <AddAccount
            callback={createAccount}
            trigger={<Button className="ui positive button">Konto hinzufügen</Button>}
        />
        }
        { <AddBookingOperation
            callback={createBuchungssatz}
            accounts={accounts}
            year={props.year}
            trigger={<Button className="ui positive button">Neuer Buchungssatz</Button>}
        />
        }

    </div>;
}