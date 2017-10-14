import React from 'react';
import GoChecklist from 'react-icons/lib/go/checklist';
import IconButton from 'react-toolbox/lib/button/IconButton';
import * as Actions from '@actions';

const TodoListIcon = () => (
    <div className="control__icon">
        <IconButton
            icon={ <GoChecklist /> }
            inverse={ true }
            onClick={ Actions.toggleTodoListVisibility } />
    </div>
);

export default TodoListIcon;
