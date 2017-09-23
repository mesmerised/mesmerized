import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';
import List from '../components/List';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import Draggable from 'react-draggable';
import * as Actions from '../utils/actions';

const handleDragStop = (ev, data) => {
    const { x, y } = data;
    const position = {x, y};
    Actions.updatePosition({position});
}

function TodoList({ showTodoList, position, items = [] }) {
    if (!showTodoList) return null;

    items = items.map(item => {
        const { id, value, hasReminder } = item;
        const iconType = hasReminder ? 'alarm_on' : 'alarm_add';
        const icon = <IconButton icon={ iconType } inverse={ true } />;
        return { id, value, icon };
    });

    const props = {
        items,
        header: 'Todo',
        isClosable: true,
        onCloseClick: Actions.hideTodoList,
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

export default ConnectedStoreHOC(TodoList);
