import React from 'react';
import MdAdd from 'react-icons/lib/md/add';
import Button from 'react-toolbox/lib/button/Button';
import ListHeader from './list.header';
import ListItem from './list.item';
import './style.css';

const List = ({
    header,
    isAddable = false,
    onAddClick,
    isClosable,
    onCloseClick,
    items = [],
    emptyMessage,
    onEmptyBodyClick,
    footer,
}) => {
    return (
        <div className="todoList">
            <ListHeader
                showCloseIcon={ isClosable }
                onCloseClick={ onCloseClick }>
                { header }
            </ListHeader>
            { items && items.length ?
                <div className="todoList__body">
                    {
                        items.map(item =>
                            <ListItem
                                key={ item.id }
                                icon={ item.icon }
                                doneIcon={ item.doneIcon }
                                isDone={ item.isDone } >
                                { item.value }
                            </ListItem>
                        )
                    }
                    <div className="todoList__body__emptyArea" onClick={ onEmptyBodyClick }></div>
                </div> :
                <div className="todoList__body todoList__body_emptyMessage" onClick={ onEmptyBodyClick }>
                    { emptyMessage }
                </div>
            }
            { isAddable &&
                <div className="todoList__footer">
                    <div className="todoList__footer__text">
                        { footer }
                    </div>
                    <div className="todoList__footer__icon">
                        <Button floating mini
                            icon={ <MdAdd /> }
                            onClick={ onAddClick } />
                    </div>
                </div>
            }
        </div>
    );
}

export default List;
