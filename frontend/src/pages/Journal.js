import React, {useEffect, useState} from "react";
import {Table, Checkbox, Icon, Button, Modal} from "semantic-ui-react";
import BookingOperationService from "../services/BookingOperationService";
import AccountService from "../services/AccountService";
import {AddBookingOperation} from "./AddBookingOperation";

export const Journal = (props) => {
    const [bookingOperations, setBookingOperations] = useState(null);
    const [accounts, setAccounts] = useState(null);

    useEffect(() => {
        retrieveBookingOperations();
        retrieveAccounts();
    }, []);

    const retrieveAccounts = () => {
        AccountService.getAll(props.type)
            .then(accounts => {
                setAccounts(accounts.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveBookingOperations = () => {
        BookingOperationService.getAll(props.year)
            .then(bookingOperations => {
                setBookingOperations(bookingOperations.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const createBuchungssatz = (bookingOperation) => {
        BookingOperationService.create(bookingOperation).then(resp => {
            retrieveBookingOperations()
        });
    };

    const updateBuchungssatz = (bookingOperation) => {
        BookingOperationService.update(bookingOperation).then(resp => {
            retrieveBookingOperations()
        });
    };

    const removeBookingOperation = (bookingOperation) => {
        BookingOperationService.remove(bookingOperation).then(resp => {
            retrieveBookingOperations()
        });
    }

    const formatDate = (date) => {
        let mm = (date.getMonth()+1 > 9 ? '' : '0') + (date.getMonth()+1);
        let dd = (date.getDate() > 9 ? '' : '0') + date.getDate();
        return dd + "." + mm + "." + date.getFullYear();
    }

    return(
        <div>
            <h3>Laufende Buchführung</h3>
            <Table compact celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>Buchungsnummer</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Datum</Table.HeaderCell>
                        <Table.HeaderCell>Buchungsbeschreibung</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Soll Konto</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Haben Konto</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Betrag</Table.HeaderCell>
                        <Table.HeaderCell width={1}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { bookingOperations && accounts && bookingOperations.map(bookingOperation => {
                      return(
                          <Table.Row>
                              <Table.Cell>{bookingOperation.runningNumber}</Table.Cell>
                              <Table.Cell>{formatDate(new Date(bookingOperation.bookingDate))}</Table.Cell>
                              <Table.Cell>{bookingOperation.description}</Table.Cell>
                              <Table.Cell>{accounts.filter(acc => parseInt(bookingOperation.sollAccount.split("/").slice(-1)[0]) === acc.id)[0].name}</Table.Cell>
                              <Table.Cell>{accounts.filter(acc => parseInt(bookingOperation.habenAccount.split("/").slice(-1)[0]) === acc.id)[0].name}</Table.Cell>
                              <Table.Cell>{bookingOperation.amount}€</Table.Cell>
                              <Table.Cell>
                                  <AddBookingOperation
                                      callback={updateBuchungssatz}
                                      title="Buchungssatz bearbeiten"
                                      year={props.year}
                                      bookingOperation={bookingOperation}
                                      trigger={<Button className="compact icon"><Icon name="edit"/></Button>}
                                  />
                                  <Button className="compact icon" onClick={() => {removeBookingOperation(bookingOperation)}}>
                                      <Icon name="close"/>
                                  </Button>
                              </Table.Cell>
                          </Table.Row>
                      );
                    })

                    }

                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='7'>
                            <AddBookingOperation
                                callback={createBuchungssatz}
                                year={props.year}
                                trigger={<Button className="ui positive button" floated="right">Neuer Buchungssatz</Button>}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    );
};