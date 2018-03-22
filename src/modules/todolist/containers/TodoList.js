import React, { Component } from 'react';
import MdDelete from 'react-icons/lib/md/delete';
import MdDeleteForever from 'react-icons/lib/md/delete-forever';
import MdDone from 'react-icons/lib/md/done';
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

const THREE_DAYS = (3 * 24 * 60 * 60 * 1000);
const getPurgeBeforeTime = (interval = THREE_DAYS) =>
    new Date().getTime() - interval;

// remove completed entries older than 3 days
// the operation might be expensive, so defer it by default
const purgeCompletedOldEntries = (interval) =>
    setTimeout( () => Actions.purgeCompleted(
        {completedBefore: getPurgeBeforeTime(interval)})
    , 0);

const handleDragStop = (ev, data) => {
    const { x, y } = data;
    const position = {x, y};
    Actions.updatePosition({position});
};

const autoFocus = instance =>
    instance && instance.focus();

const toggleCompleted = ({id, isDone}) =>
    Actions.markAsCompleted({id, completed: !isDone});

const deleteItem = ({id}) =>
    Actions.removeItem({id});

// done items at the bottom
const itemSorter = (x, y) => x.isDone ? 1 : y.isDone ? -1 : 0;

// @tod0: indicate completed/created time
const getMappedItems = items => {
    return Object.keys(items).map(id => {
        const item = items[id];
        const { value, /*createdAt,*/ /*reminderAt,*/ completedAt } = item;
        const isDone = Boolean(completedAt);
        // @todo: add reminder functionality
        // const iconType = isDone ? 'delete_forever'
        //     : (reminderAt ? 'alarm_on' : 'alarm_add');
        const icon = <IconButton inverse icon={ <MdDeleteForever /> }
            onClick={ () => deleteItem({id}) } />;
        const doneIcon = <IconButton inverse icon={ <MdDone /> }
            onClick={ () => toggleCompleted({id, isDone}) } />;
        return { id, value, icon, doneIcon, isDone };
    }).sort(itemSorter);
}

// adds item to the todo list
const addTodoList = (context, ev) => {
    const target = ev.target;
    const value = target.value.trim();

    if (!value) return true;

    try {
        Actions.addItem({ value });
        const { purgeInterval } = context.props;
        // also purge older completed entries
        // as that can get piled up in the list
        purgeCompletedOldEntries(purgeInterval);
        // empty new item input
        target.value = '';
        // @todo: scroll target to view
        target.focus();
    } catch (ex) {
        // @todo: catch add errors
    }
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

        return addTodoList(this, ev);
    };

    handleNewItemInputBlur = ev => {
        const value = ev.target.value.trim();

        if (value) addTodoList(this, ev);
        this.setState({showNew: false});
    };

    componentDidMount() {
        const { purgeInterval } = this.props;
        // purge older completed entries on load
        purgeCompletedOldEntries(purgeInterval);
    }

    render() {
        const { showTodoList, position } = this.props;
        let { items = {} } = this.props;
        const { showNew } = this.state;

        if (!showTodoList) return null;

        items = getMappedItems(items);

        if (showNew) {
            const icon = <IconButton inverse
                icon={ <MdDelete /> }
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

        let footer = 'Drag this widget using the header';
        if (position && (position.x || position.y)) {
            // do not show footer message if user has already
            // dragged the widget around and knows it already ;)
            footer = null;
        }

        const props = {
            items,
            emptyMessage,
            footer,
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
