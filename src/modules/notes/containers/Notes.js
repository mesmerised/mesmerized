import React, { Component } from 'react';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import StickyNote from '../components/StickyNote';
import * as Actions from '../utils/actions';

class Notes extends Component {
    componentDidMount() {
        // lazy initialize the state object
        setTimeout(() => Actions.refresh(), 0);
    }

    render() {
        const { positions, items = {} } = this.props;

        const itemIds = Object.keys(items);
        const stickyNotes = itemIds.map((id, index) => {
            const item = items[id];
            const { value, theme } = item;
            const style = { position: 'absolute', left: 0, right: 0, zIndex: 1 };

            let isNew = false;
            let defaultDragPosition = positions[id];
            if (!defaultDragPosition) {
                defaultDragPosition = { x: 0, y: 0 };
                // increase z-index to avoid overlap
                style.zIndex = 2;

                // no default position, value or theme
                // meaning the user hasn't interacted with the widget yet
                if (!value && !theme) {
                    isNew = true;
                }
            }

            return (
                <div style={style} key={`sticky-note-container-${id}`}>
                    <StickyNote
                        note={value}
                        defaultDragPosition={defaultDragPosition}
                        theme={theme}
                        applyAnimation={isNew}
                        onNoteChange={ev => Actions.updateItem({ id, value: ev.target.value })}
                        onThemeChange={theme => Actions.updateItem({ id, theme })}
                        onDragStop={(ev, { x, y }) => Actions.updatePosition({ id, position: { x, y } })}
                        onDeleteClick={() => Actions.removeItem({ id })} />
                </div>
            );
        });
        return <div>{stickyNotes}</div>;
    }
}

export default ConnectedStoreHOC(Notes);
