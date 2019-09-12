import React from "react";
import Note from "../Note/Note";
import "./NotePageMain.css";
import StateContext from "../Context/StateContext";

export default function NotePageMain(props) {
  return (
    <StateContext.Consumer>
      {context => {
        return (
          <section className="NotePageMain">
            <Note id={props.note.id} name={props.note.name} modified={props.note.modified} />
            <div className="NotePageMain__content">
              {props.note.content.split(/\n \r|\n/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        );
      }}
    </StateContext.Consumer>
  );
}

NotePageMain.defaultProps = {
  note: {
    content: ""
  }
};
