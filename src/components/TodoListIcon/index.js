import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';
import * as Actions from '@actions';

const TodoListIcon = () => (
    <div className="control__icon">
        <IconButton
            icon="view_list"
            inverse={ true }
            onClick={ Actions.toggleTodoListVisibility } />
    </div>
);

export default TodoListIcon;
