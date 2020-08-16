import React, { useState } from "react";
import {Button, Dropdown, Form, Modal} from 'semantic-ui-react'
import AccountService from "../services/AccountService";

export const AddBookingOperation = (props) => {
    const [options, setOptions] = useState(null);
    const [soll, setSoll] = useState(null);
    const [haben, setHaben] = useState(null);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(null);
    const [description, setDescription] = useState(null);
    const numberRegexp = /^\d{1,10}[.]?\d{0,10}$/;

    const retrieveAccounts = () => {
        AccountService.getAll()
            .then(response => {
                setOptions(response.data.map(acc => {return { key: acc.id, text: acc.name + " (" + (acc.typ === "active" ? "Aktiv" : "Passiv") +")", value: acc.id }}));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const create = () => {
        if(numberRegexp.test(amount) && parseFloat(amount) > 0 && soll && haben && soll !== haben) {
            let bookingOperation = props.bookingOperation ? props.bookingOperation : {};
            bookingOperation.description = description;
            bookingOperation.sollAccount = "/api/accounts/"+soll;
            bookingOperation.habenAccount = "/api/accounts/"+haben;
            bookingOperation.amount = parseFloat(amount);
            bookingOperation.year = props.year;
            props.callback(bookingOperation);
            onClose();
        }
    }

    const onClose = () => {
            setOpen(false);
            setSoll(null);
            setHaben(null);
            setAmount(null);
            setDescription(null);
    }

    return(
            <Modal
                onClose={onClose}
                onOpen={() => {
                    setOpen(true);
                    retrieveAccounts();
                }}
                open={open}
                trigger={props.trigger}
                size="tiny"
            >
                <Modal.Header>Neuer Buchungssatz</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Form>
                            <label>Soll</label>
                            <Dropdown
                                placeholder='Soll Konto'
                                name='soll'
                                options={options}
                                fluid
                                selection
                                value={soll}
                                error={haben === soll && soll !== null ? "Ziel- und Empfängerkonto gleich" : null}
                                onChange={(e, {value}) => setSoll(value)}
                            />
                            <label>an Haben</label>
                            <Dropdown
                                placeholder='Haben Konto'
                                name='haben'
                                options={options}
                                fluid
                                selection
                                value={haben}
                                error={haben === soll && soll !== null ? "Ziel- und Empfängerkonto gleich" : null}
                                onChange={(e, {value}) => setHaben(value)}
                            />
                            <Form.Field
                                label="Betrag"
                                control="input"
                                name='accName'
                                value={amount}
                                error={numberRegexp.test(amount) ? null : "Keine Zahl"}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <Form.Field
                                label="Beschreibung"
                                control="input"
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Speichern"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={create}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
}


