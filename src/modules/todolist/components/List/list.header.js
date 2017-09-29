import React from 'react';
import MdClose from 'react-icons/lib/md/close';
import IconButton from 'react-toolbox/lib/button/IconButton';

const ListHeader = ({ children, showCloseIcon = false, onCloseClick }) => (
    <div className="todoList__header" >
        <div className="todoList__header__text">
            { children }
        </div>
        { showCloseIcon &&
            <div className="todoList__header__icon">
                <IconButton
                icon={ <MdClose /> }
                inverse={ true }
                onClick={ onCloseClick } />
            </div>
        }
    </div>
);

export default ListHeader;
