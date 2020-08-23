import React, {useEffect, useState} from "react";
import {Button, Dropdown, Form, Modal} from 'semantic-ui-react'
import AccountService from "../services/AccountService";
import RunningNumberService from "../services/RunningNumberService";

export const AddBookingOperation = (props) => {
    const [options, setOptions] = useState(null);
    const [soll, setSoll] = useState(props.bookingOperation ? props.bookingOperation.sollAccount : null);
    const [haben, setHaben] = useState(props.bookingOperation ? props.bookingOperation.habenAccount : null);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(props.bookingOperation ? props.bookingOperation.amount : null);
    const [description, setDescription] = useState(props.bookingOperation ? props.bookingOperation.description : null);
    const [month, setMonth] = useState(props.bookingOperation ? new Date(props.bookingOperation.bookingDate).getMonth() : (new Date()).getMonth());
    const [day, setDay] = useState(props.bookingOperation ? new Date(props.bookingOperation.bookingDate).getDate() : (new Date()).getDate());
    const [dayOptions, setDayOptions] = useState([]);

    const numberRegexp = /^\d{1,10}[.]?\d{0,10}$/;

    const retrieveAccounts = () => {
        AccountService.getAll()
            .then(response => {
                setOptions(response.data.map(acc => {return { key: acc.id, text: acc.name + " (" + (acc.typ === "active" ? "Aktiv" : "Passiv") +")", value: "/api/accounts/"+acc.id }}));
            })
            .catch(e => {
                console.log(e);
            });
    };

    const create = () => {
        if(numberRegexp.test(amount) &&
            parseFloat(amount) > 0 &&
            soll &&
            haben &&
            soll !== haben &&
            day !== null &&
            month !==null
        ) {
            let bookingOperation = props.bookingOperation ? props.bookingOperation : {};
            bookingOperation.description = description;
            bookingOperation.sollAccount = soll;
            bookingOperation.habenAccount = haben;
            bookingOperation.bookingDate = props.year+"-"+(month+1)+"-"+day+"T12:00:00Z";
            bookingOperation.amount = parseFloat(amount);
            bookingOperation.year = props.year;

            if(!bookingOperation.runningNumber) {
                RunningNumberService.get(props.year).then(response => {
                    bookingOperation.runningNumber = response.data.runningNumber;
                    props.callback(bookingOperation);
                    onClose();
                })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                props.callback(bookingOperation);
                onClose();
            }
        }
    }

    const onClose = () => {
        setOpen(false);
        if(!props.bookingOperation) {
            setSoll(null);
            setHaben(null);
            setAmount(null);
            setMonth(null);
            setDay(null);
            setDescription(null);
        }
    }

    const getDaysInMonth = date =>
        new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const monthOptions = [
        { key: 1, text: 'Januar', value: 0 },
        { key: 2, text: 'Februar', value: 1 },
        { key: 3, text: 'März', value: 2 },
        { key: 4, text: 'April', value: 3 },
        { key: 5, text: 'Mai', value: 4 },
        { key: 6, text: 'Juni', value: 5 },
        { key: 7, text: 'Juli', value: 6 },
        { key: 8, text: 'August', value: 7 },
        { key: 9, text: 'September', value: 8 },
        { key: 10, text: 'Oktober', value: 9 },
        { key: 11, text: 'November', value: 10 },
        { key: 12, text: 'Dezember', value: 11 },
    ];

    const calculateDaysOptions = () => {
        let daysInMonth = getDaysInMonth(new Date(props.year, month+1, 0));
        if(day > daysInMonth) {
            setDay(null);
        }
        let options = [];
        for(let i=1; i<=daysInMonth;i++) {
            options.push({ key: i, text: i, value: i });
        }
        setDayOptions(options);
    }

    useEffect(() => {
        calculateDaysOptions();
    }, [month]);

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
                <Modal.Header>{props.title || "Neuer Buchungssatz"}</Modal.Header>
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
                            <Form.Field>
                                <label>Buchungsdatum</label>
                                <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Tag</label>
                                        <Dropdown
                                            placeholder='Tag'
                                            name='day'
                                            options={dayOptions}
                                            error={day !== null ? null : "Tag auswählen"}
                                            fluid
                                            selection
                                            value={day}
                                            onChange={(e, {value}) => setDay(value)}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                    <label>Monat</label>
                                    <Dropdown
                                        placeholder='Monat'
                                        name='month'
                                        options={monthOptions}
                                        fluid
                                        selection
                                        error={month !== null ? null : "Monat auswählen"}
                                        value={month}
                                        onChange={(e, {value}) => setMonth(value)}
                                    />
                                    </Form.Field>
                                    <Form.Field
                                        label="Jahr"
                                        control="input"
                                        name='year'
                                        value={props.year}
                                        disabled
                                    />
                                </Form.Group>
                            </Form.Field>
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


