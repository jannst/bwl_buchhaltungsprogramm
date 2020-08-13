import React, {useEffect, useState} from "react";
import AccountService from "../services/AccountService";
import OpeningBalanceService from "../services/OpeningBalanceService";

export const OpenBalance = (props) => {
    const [accounts, setAccounts] = useState(null);
    const [openingBalances, setOpeningBalances] = useState(null);

    useEffect(() => {
        retrieveAccounts();
        retrieveOpeningBalances();
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

    const retrieveOpeningBalances = () => {
        OpeningBalanceService.getAll(props.type)
            .then(response => {
                setOpeningBalances(
                    response.data.reduce(function(accum, currentVal) {
                    accum[currentVal.id] = currentVal.title;
                    return accum;
                }, {})
                );
            })
            .catch(e => {
                console.log(e);
            });
    };
    return <div>

    </div>;
};