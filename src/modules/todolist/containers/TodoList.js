import React, { Component } from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Input from 'react-toolbox/lib/input/Input';
import List from '../components/List';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import Draggable from 'react-draggable';
import * as Actions from '../utils/actions';

const KEYS = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
};

const handleDragStop = (ev, data) => {
    const { x, y } = data;
    const position = {x, y};
    Actions.updatePosition({position});
};

const autoFocus = instance =>
    instance && instance.focus();

const toggleCompleted = ({id, isDone}) =>
    Actions.markAsCompleted({id, completed: !isDone});

// done items at the bottom
const itemSorter = (x, y) => x.isDone ? 1 : y.isDone ? -1 : 0;
// @todo: add delete functionality
// @tod0: indicate completed/created time
const getMappedItems = items => {
    return Object.keys(items).map(id => {
        const item = items[id];
        const { value, /*createdAt,*/ reminderAt, completedAt } = item;
        const isDone = Boolean(completedAt);
        const iconType = isDone ? 'delete_forever'
            : (reminderAt ? 'alarm_on' : 'alarm_add');
        const icon = <IconButton inverse icon={ iconType } />;
        const doneIcon = <IconButton inverse icon="done"
            onClick={ () => toggleCompleted({id, isDone}) } />;
        return { id, value, icon, doneIcon, isDone };
    }).sort(itemSorter);
}

class TodoList extends Component {
    state = {
        showNew: false,
    };

    handleAddClick = () => {
        this.setState({showNew: true});
    };

    handleCloseNewClick = () => {
        this.setState({showNew: false});
    };

    handleNewItemInputKeyPress = ev => {
        const key = ev.key;

        if (key !== KEYS.ENTER) return true;

        const target = ev.target;
        const value = target.value.trim();

        if (!value) return true;

        try {
            Actions.addItem({ value });
            target.value = '';
            // @todo: scroll target to view
            target.focus();
        } catch(ex) {
            // @todo: catch add errors
        }
    };

    handleNewItemInputBlur = ev => {
        const value = ev.target.value.trim();
        !value && this.setState({showNew: false});
    };

    render() {
        const { showTodoList, position } = this.props;
        let { items = {} } = this.props;
        const { showNew } = this.state;

        if (!showTodoList) return null;

        items = getMappedItems(items);

        if (showNew) {
            const icon = <IconButton inverse
                icon="delete"
                onClick={ this.handleCloseNewClick } />

            const value = <Input
                type="text"
                innerRef={ autoFocus }
                onKeyPress={ this.handleNewItemInputKeyPress }
                onBlur={ this.handleNewItemInputBlur } />

            items.push({id: 'show_new', isNew: true, value, icon});
        }

        const emptyMessage =
            <div style={ { textAlign: 'center' } }>
                <p>It's lonely in here, plan some achievements :)</p>
                <p>Click to add a new item!</p>
            </div>;

        const props = {
            items,
            emptyMessage,
            header: 'Todo',
            isClosable: true,
            isAddable: true,
            onAddClick: this.handleAddClick,
            onCloseClick: Actions.hideTodoList,
            onEmptyBodyClick: this.handleAddClick,
        };

        return (
            <Draggable
                handle=".todoList__header__text"
                onStop={ handleDragStop }
                defaultPosition={ position } >
                <div>
                    <List {...props} />
                </div>
            </Draggable>
        );
    }
}

export default ConnectedStoreHOC(TodoList);
