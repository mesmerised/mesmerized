import React from 'react';
import ListHeader from './list.header';
import ListItem from './list.item';
import './style.css';

const List = ({ header, isClosable, onCloseClick, items = [] }) => {
    return (
        <div className="todoList">
            <ListHeader
                showCloseIcon={ isClosable }
                onCloseClick={ onCloseClick }>
                { header }
            </ListHeader>
            <div className="todoList__body">
                {
                    items.map(item =>
                        <ListItem
                            key={ item.id }
                            icon={ item.icon }>{ item.value }
                        </ListItem>
                    )
                }
            </div>
        </div>
    );
}

export default List;
