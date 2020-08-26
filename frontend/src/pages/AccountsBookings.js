import React, { useState, useEffect } from "react";
import {Grid, Header, Segment} from "semantic-ui-react";

export const AccountBookings = (props) => {

    const findOtherAccount = (bookingOperation, isSoll) => {
        let otherAccId = isSoll ? bookingOperation.habenAccount : bookingOperation.sollAccount;
        otherAccId = parseInt(otherAccId.split("/").slice(-1));
        return props.accounts.filter(acc => acc.id === otherAccId)[0];
    }

    const SollAmount = () => {
        return props.bookingOperationsSoll.map(op => op.amount).reduce(function(pv, cv) { return pv + cv; }, 0) + (props.account.typ === "active" ? props.openingBalance : 0);
    }

    const HabenAmount = () => {
        return props.bookingOperationsHaben.map(op => op.amount).reduce(function(pv, cv) { return pv + cv; }, 0) + (props.account.typ === "passive" ? props.openingBalance : 0);
    }

    const AccountBalance = (info) => {
        let sollAmount = SollAmount();
        let habenAmount = HabenAmount();

        let result = sollAmount > habenAmount ? sollAmount - habenAmount : habenAmount - sollAmount;

        if((sollAmount < habenAmount && info.isSoll) || (sollAmount > habenAmount && !info.isSoll)) {
            return <Grid.Row><span style={{fontWeight: "bold"}}>Saldo  <span style={{float: "right"}}>{result}€</span></span></Grid.Row>
        }
        return null;
    };

    return(
        <div>
            <Grid centered columns={2} divided={true}>
                <Grid.Column>
                    <Header as='h4' textAlign='center' >Soll</Header>
                    {
                        props.account.typ === "active" ? <Grid.Row>EBK<span style={{float: "right"}}>{props.openingBalance}€</span></Grid.Row> : ""
                    }
                    {
                        props.bookingOperationsSoll.map(op => {
                            let otherAcc = findOtherAccount(op, true);
                            return otherAcc ? <Grid.Row>{otherAcc.name} #{op.runningNumber} <span style={{float: "right"}}>{op.amount}€</span></Grid.Row> : null;
                        })
                    }
                </Grid.Column>
                <Grid.Column>
                    <Header as='h4' textAlign='center' >Haben</Header>
                    {
                        props.account.typ === "passive" ? <Grid.Row>EBK<span style={{float: "right"}}>{props.openingBalance}€</span></Grid.Row> : ""
                    }
                    {
                        props.bookingOperationsHaben.map(op => {
                            let otherAcc = findOtherAccount(op, false);
                            return otherAcc ? <Grid.Row>{otherAcc.name} #{op.runningNumber}  <span style={{float: "right"}}>{op.amount}€</span></Grid.Row> : null;
                        })
                    }
                </Grid.Column>
            </Grid>
            <Grid centered columns={2} divided={true}>
                <Grid.Column>
                    <Grid.Row><span style={{fontWeight: "bold"}}>Summe Soll  <span style={{float: "right"}}><SollAmount/>€</span></span></Grid.Row>
                    <AccountBalance isSoll={true} />
                </Grid.Column>
                <Grid.Column>
                    <Grid.Row><span style={{fontWeight: "bold"}}>Summe Haben  <span style={{float: "right"}}><HabenAmount/>€</span></span></Grid.Row>
                    <AccountBalance isSoll={false} />
                </Grid.Column>
            </Grid>
        </div>
    );
}