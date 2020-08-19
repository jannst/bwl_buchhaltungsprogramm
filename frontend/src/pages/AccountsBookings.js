import React, { useState, useEffect } from "react";
import {Grid, Header, Segment} from "semantic-ui-react";

export const AccountBookings = (props) => {

    const findOtherAccount = (bookingOperation, isSoll) => {
        let otherAccId = isSoll ? bookingOperation.habenAccount : bookingOperation.sollAccount;
        otherAccId = parseInt(otherAccId.split("/").slice(-1));
        return props.accounts.filter(acc => acc.id === otherAccId)[0];
    }

    return(
        <Grid centered columns={2} divided={true}>
            <Grid.Column>
                <Header as='h4' textAlign='center' >Soll</Header>
                {
                    props.bookingOperationsSoll.map(op => {
                        let otherAcc = findOtherAccount(op, true);
                        return <Grid.Row>{otherAcc.name}  <span style={{float: "right"}}>{op.amount}€</span></Grid.Row>;
                    })
                }
            </Grid.Column>
            <Grid.Column>
                <Header as='h4' textAlign='center' >Haben</Header>
                {
                    props.bookingOperationsHaben.map(op => {
                        let otherAcc = findOtherAccount(op, false);
                        return <Grid.Row>{otherAcc.name}  <span style={{float: "right"}}>{op.amount}€</span></Grid.Row>;
                    })
                }
            </Grid.Column>
        </Grid>
    );
}