import React, {Component} from 'react'
import {Button, Form, Modal, Dropdown} from 'semantic-ui-react'
import AccountService from "../services/AccountService";

export class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: props.accounts,
            accName: props.account ? props.account.name : "",
            accType: props.account ? props.account.typ : ""
        }
        this.account = props.account ? props.account : {}
        this.title = props.account ? "Konto bearbeiten" : "Konto erstellen"
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyDown.bind(this), false);
    }

    handleKeyDown(e) {
        if(e.keyCode === 13 && this.state.open) {
            this.create();
        }
    }

    retrieveAccounts() {
        AccountService.getAll()
            .then(response => {
                this.setState({accounts: response.data});
            })
            .catch(e => {
                console.log(e);
            });
    };

    create() {
        if(this.state.accName === this.account.name && this.state.accType === this.account.typ) {
            this.setState({open: false});
            this.setState({nameError: null})
            this.setState({typeError: null})
        }
        else if(this.state.accounts.includes(this.state.accName)) {
            this.setState({nameError: "Name bereits verwendet"})
        }
        else if(!this.state.accName) {
            this.setState({nameError: "Name leer"})
        } else if(!this.state.accType) {
            this.setState({typeError: "Typ leer"})
        } else {
            this.setState({open: false});
            this.account.name = this.state.accName;
            this.account.typ = this.state.accType;
            this.props.callback(this.account)
            this.setState({nameError: null})
            this.setState({typeError: null})
            this.setState({accName: null})
            this.setState({accType: null})
        }
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
    handleChangeDropDown = (e, {value}) => this.setState({ "accType": value })

    options = [
        { key: 1, text: 'Aktivkonto', value: "active" },
        { key: 2, text: 'Passivkonto', value: "passive" },
    ]

    render() {
        const { accName, open, nameError, typeError, accType} = this.state
        return (
            <Modal
                onClose={() => this.setState({open: false})}
                onOpen={() => {
                    this.setState({open: true});
                    this.retrieveAccounts();
                }}
                open={open}
                trigger={this.props.trigger}
                size="tiny"
            >
                <Modal.Header>{this.title}</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        {this.state.accounts &&
                        <Form>
                            <Form.Field
                                label="Konto Name"
                                control="input"
                                name='accName'
                                value={accName}
                                onChange={this.handleChange}
                                error={nameError}
                            />
                            <Dropdown
                                placeholder='Kontotyp'
                                name='accType'
                                options={this.options}
                                value={accType}
                                fluid
                                selection
                                onChange={this.handleChangeDropDown}
                                error={typeError}
                                disabled={this.props.account != null}
                            />
                        </Form>
                        }
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Speichern"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.create.bind(this)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}


