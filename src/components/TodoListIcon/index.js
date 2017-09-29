import React from 'react';
import MdViewList from 'react-icons/lib/md/view-list';
import IconButton from 'react-toolbox/lib/button/IconButton';
import * as Actions from '@actions';

const TodoListIcon = () => (
    <div className="control__icon">
        <IconButton
            icon={ <MdViewList /> }
            inverse={ true }
            onClick={ Actions.toggleTodoListVisibility } />
    </div>
);

export default TodoListIcon;
