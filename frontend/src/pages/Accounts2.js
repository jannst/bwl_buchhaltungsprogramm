import { Button, Grid, Segment, Header } from 'semantic-ui-react'
import React, { useState, useEffect } from "react";
import AccountService from "../services/AccountService";
import { AddAccount } from "./AddAccount"
import {AddBookingOperation} from "./AddBookingOperation";
import {Accounts} from "./Accounts";
import BookingOperationService from "../services/BookingOperationService";
import OpeningBalanceService from "../services/OpeningBalanceService";

export const Accounts2 = (props) => {
    const [accounts, setAccounts] = useState(null);
    const [openingBalances, setOpeningBalances] = useState(null);
    const [bookingOperations, setBookingOperations] = useState(null);

    useEffect(() => {
        retrieveAccounts();
        retrieveBookingOperations();
        retrieveOpeningBalances();
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

    const retrieveOpeningBalances = () => {
        OpeningBalanceService.getAll(props.year)
            .then(response => {
                setOpeningBalances(response.data);
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
        });
    }

    return <div style={{paddingBottom: "15px"}}>
        <Grid centered columns={2} celled='internally'>
            <Grid.Column>
                <Segment basic>
                    <Header as='h3' textAlign='center'>Aktivkonten</Header>
                    {accounts && openingBalances && bookingOperations &&
                    <Accounts
                        year={props.year}
                        openingBalances={openingBalances}
                        bookingOpertions={bookingOperations}
                        accounts={accounts}
                        type="active"
                    />}
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment basic>
                    <Header as='h3' textAlign='center'>Passivkonten</Header>
                    {accounts && bookingOperations && openingBalances &&
                    <Accounts
                        year={props.year}
                        openingBalances={openingBalances}
                        type="passive"
                        bookingOpertions={bookingOperations}
                        accounts={accounts}
                    />}
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