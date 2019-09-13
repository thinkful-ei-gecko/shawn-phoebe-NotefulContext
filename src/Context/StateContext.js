import React from 'react';

const StateContext = React.createContext({
    folder: [],
    notes: [],
    deleteNote: (noteId) => {}
    //this.props.folders.id
    //this.props.folders.name
});

export default StateContext;