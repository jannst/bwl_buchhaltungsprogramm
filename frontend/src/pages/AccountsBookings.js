import React, { useState, useEffect } from "react";
import {Grid, Header, Segment} from "semantic-ui-react";

export const AccountBookings = (props) => {

    const findOtherAccount = (bookingOperation, isSoll) => {
        let otherAccId = isSoll ? bookingOperation.habenAccount : bookingOperation.sollAccount;
        otherAccId = parseInt(otherAccId.split("/").slice(-1));
        return props.accounts.filter(acc => acc.id === otherAccId)[0];
    }

    const AccountBalance = (info) => {
        let sollAmount = props.bookingOperationsSoll.map(op => op.amount).reduce(function(pv, cv) { return pv + cv; }, 0);
        let habenAmount = props.bookingOperationsHaben.map(op => op.amount).reduce(function(pv, cv) { return pv + cv; }, 0);

        let result = props.openingBalance + (props.account.typ === "active" ? sollAmount - habenAmount : habenAmount - sollAmount)

        if(info.isSoll) {
            if(props.account.typ === "active") {
                result = result > 0 ? <span style={{color: "green"}}>{result}€</span> : null;
            } else {
                result =  result < 0 ? <span style={{color: "red"}}>{Math.abs(result)}€</span> : null;
            }
        } else {
            if(props.account.typ === "passive") {
                result = result > 0 ? <span style={{color: "green"}}>{result}€</span> : null;
            } else {
                result =  result < 0 ? <span style={{color: "red"}}>{Math.abs(result)}€</span> : null;
            }
        }
        return result ? <Grid.Row><span style={{fontWeight: "bold"}}>Betrag  <span style={{float: "right"}}>{result}</span></span></Grid.Row> : null;
    };

    return(
        <Grid centered columns={2} divided={true}>
            <Grid.Column>
                <Header as='h4' textAlign='center' >Soll</Header>
                {
                    props.account.typ === "active" ? <Grid.Row>EBK<span style={{float: "right"}}>{props.openingBalance}€</span></Grid.Row> : ""
                }
                {
                    props.bookingOperationsSoll.map(op => {
                        let otherAcc = findOtherAccount(op, true);
                        return <Grid.Row>{otherAcc.name} #{op.runningNumber} <span style={{float: "right"}}>{op.amount}€</span></Grid.Row>;
                    })
                }
                <AccountBalance isSoll={true} />
            </Grid.Column>
            <Grid.Column>
                <Header as='h4' textAlign='center' >Haben</Header>
                {
                    props.account.typ === "passive" ? <Grid.Row>EBK<span style={{float: "right"}}>{props.openingBalance}€</span></Grid.Row> : ""
                }
                {
                    props.bookingOperationsHaben.map(op => {
                        let otherAcc = findOtherAccount(op, false);
                        return <Grid.Row>{otherAcc.name} #{op.runningNumber}  <span style={{float: "right"}}>{op.amount}€</span></Grid.Row>;
                    })
                }
                <AccountBalance isSoll={false} />
            </Grid.Column>
        </Grid>
    );
}