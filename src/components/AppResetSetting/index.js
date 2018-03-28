import React, { Component } from 'react';
import Icon from 'react-icons/lib/fa/exclamation-triangle';
import List from 'react-toolbox/lib/list/List';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';
import ListItem from 'react-toolbox/lib/list/ListItem';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Button from 'react-toolbox/lib/button/Button';
import Snackbar from 'react-toolbox/lib/snackbar/Snackbar';
import * as Actions from '@actions';

class AppResetSetting extends Component {
    state = {
        isDialogActive: false,
        isSnackbarActive: false,
    };

    handleToggle = () => {
        this.setState({ isDialogActive: !this.state.isDialogActive });
    }

    resetExtension = () => {
        Actions.resetApp();
        Actions.refreshModules();
        this.handleToggle();
        this.setState({ isSnackbarActive: true });
    }

    handleSnackbarTimeout = () => {
        this.setState({ isSnackbarActive: false });
    }

    actions = [
        { label: "Cancel", onClick: this.handleToggle, raised: true },
        { label: "Proceed", onClick: this.resetExtension, raised: true, accent: true },
    ];

    render() {
        const {
            isDialogActive,
            isSnackbarActive
        } = this.state;
        return (
            <List>
                <ListSubHeader caption="Reset Extension" />
                <ListItem
                    selectable={false}
                    ripple={false}
                    itemContent=
                    {
                        <Button accent raised
                            label="Delete data and reset"
                            icon={<Icon />}
                            onClick={this.handleToggle} />
                    } >
                </ListItem>
                <Dialog
                    actions={this.actions}
                    active={isDialogActive}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title="Reset Extension"
                    type="small" >
                    <p>
                        This will reset the application to its original state.
                        All customizations and data that you might have stored in the application, will be lost.
                        Are you sure?
                    </p>
                </Dialog>
                <Snackbar
                    active={isSnackbarActive}
                    label="Application reset successful"
                    timeout={2000}
                    onTimeout={this.handleSnackbarTimeout}
                />
            </List>
        );
    }
}

export default AppResetSetting;
