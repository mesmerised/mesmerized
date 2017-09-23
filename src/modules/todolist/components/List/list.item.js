import React from 'react';

const ListItem = ({ children, icon = null }) => (
    <div className="todoList__item" >
        <div className="todoList__item__text">
            { children }
        </div>
        { icon &&
            <div className="todoList__item__icon">
                { icon }
            </div>
        }
    </div>
);

export default ListItem;
