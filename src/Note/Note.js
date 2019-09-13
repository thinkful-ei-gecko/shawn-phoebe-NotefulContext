import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import StateContext from '../Context/StateContext'

export default class Note extends React.Component {
  render() {
    return (
      <StateContext.Consumer>
        {context => (
          <div className='Note'>
            <h2 className='Note__title'>
              <Link to={`/note/${this.props.id}`}>
                {this.props.name}
              </Link>
            </h2>
            )}
    
      <button onClick={context.deleteNoteFromState(this.props.id)} className='Note__delete' type='button'>
              <FontAwesomeIcon icon='trash-alt' />
              {' '}
              remove
      </button>
            <div className='Note__dates'>
              <div className='Note__dates-modified'>
                Modified
          {' '}
                <span className='Date'>
                  {format(this.props.modified, 'Do MMM YYYY')}
                </span>
              </div>
            </div>
          </div>
     
    </StateContext.Consumer>
    )};
  }

