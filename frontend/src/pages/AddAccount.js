import React, {Component} from 'react'
import {Button, Form, Modal} from 'semantic-ui-react'

export class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accName: props.account ? props.account.name : ""
        }
        this.account = props.account ? props.account : {}
        this.title = props.account ? "Konto bearbeiten" : "Konto erstellen"
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

    create() {
        if(this.state.accName === this.account.name) {
            this.setState({open: false});
            this.setState({nameError: null})
        }
        else if(this.props.accounts.includes(this.state.accName)) {
            this.setState({nameError: "Name bereits verwendet"})
        }
        else if(!this.state.accName) {
            this.setState({nameError: "Name leer"})
        } else {
            this.setState({open: false});
            this.account.name = this.state.accName;
            this.props.callback(this.account)
            this.setState({nameError: null})
        }
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { accName, open, nameError } = this.state
        return (
            <Modal
                onClose={() => this.setState({open: false})}
                onOpen={() => this.setState({open: true})}
                open={open}
                trigger={this.props.trigger}
                size="tiny"
            >
                <Modal.Header>{this.title}</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Form>
                            <Form.Field
                                label="Konto Name"
                                control="input"
                                name='accName'
                                value={accName}
                                onChange={this.handleChange}
                                error={nameError}
                            />
                        </Form>
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


