import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import "./NoteListMain.css";
import StateContext from "../Context/StateContext";
import { getNotesForFolder } from "../notes-helpers";

export default function NoteListMain(props) {

  console.log();

  return (
    <StateContext.Consumer>
      {context => {
        const notesForFolder = getNotesForFolder(
          context.notes,
          props.match.params.folderId
          //the above was originally called in App.js; not sure if this syntax
          //is correct; if doesn't render see NotePageNav CircleButton onClick
        );
        return (
          <section className="NoteListMain">
            <ul>
              {notesForFolder.map(note => (
                <li key={note.id}>
                  <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                  />
                </li>
              ))}
            </ul>
            <div className="NoteListMain__button-container">
              <CircleButton
                tag={Link}
                to="/add-note"
                type="button"
                className="NoteListMain__add-note-button"
              >
                <FontAwesomeIcon icon="plus" />
                <br />
                Note
              </CircleButton>
            </div>
          </section>
        );
      }}
    </StateContext.Consumer>
  );
}

NoteListMain.defaultProps = {
  notes: []
};
