import React from 'react';

const StateContext = React.createContext({
    folder: [],
    notes: []
    //this.props.folders.id
    //this.props.folders.name
});

export default StateContext;