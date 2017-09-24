import React from 'react';

const ListItem = ({ children, icon = null, doneIcon = null, isDone = false }) => (
    <div className="todoList__item" >
        { doneIcon &&
            <div className="todoList__item__icon">
                { isDone ?
                    React.cloneElement(doneIcon, {className: 'todoList__item__icon_done'})
                    : React.cloneElement(doneIcon, {className: 'todoList__item__icon_tick'})
                }
            </div>
        }
        <div className={ `todoList__item__text ${doneIcon? 'todoList__item__text_hasPrecedingIcon': ''} ${isDone ? 'todoList__item__text_done' : ''}` }>
            { (children && typeof children !== 'string') ?
                React.cloneElement(children, {className: 'todoList__item__new'})
                : children
            }
        </div>
        { icon &&
            <div className="todoList__item__icon">
                { icon }
            </div>
        }
    </div>
);

export default ListItem;
