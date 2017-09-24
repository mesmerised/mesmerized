import React from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';

const ListHeader = ({ children, showCloseIcon = false, onCloseClick }) => (
    <div className="todoList__header" >
        <div className="todoList__header__text">
            { children }
        </div>
        { showCloseIcon &&
            <div className="todoList__header__icon">
                <IconButton
                icon="close"
                inverse={ true }
                onClick={ onCloseClick } />
            </div>
        }
    </div>
);

export default ListHeader;
