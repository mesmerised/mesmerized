import React from 'react';
import MdNoteAdd from 'react-icons/lib/md/note-add';
import IconButton from 'react-toolbox/lib/button/IconButton';
import * as Actions from '@actions';

const NotesIcon = () => (
    <div className="control__icon">
        <IconButton
            icon={<MdNoteAdd />}
            inverse={true}
            onClick={Actions.addStickyNote} />
    </div>
);

export default NotesIcon;
