import React, { useState, useEffect } from "react";
import {Grid, Header, Segment} from "semantic-ui-react";

export const AccountBookings = (props) => {
    const [otherAccounts, setOtherAccounts] = useState(null);

    useEffect(() => {
        let ownAccId = "/api/accounts/"+props.account.id;
        let otherAccs = {};
        props.accounts.forEach(account => {

        });
    }, [props.accounts, props.account])

    return(
        <Grid centered columns={2} divided={true}>
            <Grid.Column>
                <Header as='h4' textAlign='center' >Soll</Header>
                {
                    props.bookingOperationsSoll.map(op => <Grid.Row>{op.description}</Grid.Row>)
                }
            </Grid.Column>
            <Grid.Column>
                <Header as='h4' textAlign='center' >Haben</Header>
                {
                    props.bookingOperationsHaben.map(op => <Grid.Row>{op.description}</Grid.Row>)
                }
            </Grid.Column>
        </Grid>
    );
}