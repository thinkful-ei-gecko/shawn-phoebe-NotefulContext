import React from 'react';

const FoldersContext = React.createContext({
    folder: [],
    notes: []
    //this.props.folders.id
    //this.props.folders.name
});

export default FoldersContext;