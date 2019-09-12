import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import dummyStore from "../dummy-store";
import { findNote, findFolder } from "../notes-helpers";
import "./App.css";
import StateContext from "../Context/StateContext";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    // fake date loading from API call
    fetch(`http://localhost:9090/folders`,{
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    }) 
        .then(res => {
            if(!res.ok){
                return res.json().then(error => {
                    console.log("Fetch Error")
                })
            }return res.json();
        })
        .then(resJson => {
            console.log(resJson);
            this.setState({
                folders: resJson
            })
        // .catch(err => {
        //         console.log("Fetch Error", err);
        //     });
     })



     fetch(`http://localhost:9090/notes`,{
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    }) 
        .then(res => {
            if(!res.ok){
                return res.json().then(error => {
                    console.log("Fetch Error")
                })
            }return res.json();
        })
        .then(resJson => {
            console.log(resJson);
            this.setState({
                notes: resJson
            })
        // .catch(err => {
        //         console.log("Fetch Error", err);
        //     });
     })
 }


 



  deleteNote(noteId, folderId, callback) {
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        callback(bookmarkId)
      })
      .catch(error => {
        console.error(error)
      })
  }



  renderNavRoutes() {
    //const {notes, folders} = this.state;
    return (
      <>
        <StateContext.Provider
          value={{
            folders: this.state.folders,
            notes: this.state.notes
          }}
        >
          {["/", "/folder/:folderId"].map(path => (
            <Route
              exact
              key={path}
              path={path}
              render={routeProps => (
                <NoteListNav
                //folders={folders}
                //notes={notes}
                {...routeProps}
                />
              )}
            />
          ))}
        </StateContext.Provider>

        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(this.state.notes, noteId) || {};
            const folder = findFolder(this.state.folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    //const {notes, folders} = this.state;
    return (
      <>
        <StateContext.Provider
          value={{
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.deleteNote,
          }}
        >
          {["/", "/folder/:folderId"].map(path => (
            <Route
              exact
              key={path}
              path={path}
              render={routeProps => {
                //Move below to NotesListMain
                return <NoteListMain {...routeProps} />;
              }}
            />
          ))}
          <Route
            path="/note/:noteId"
            render={routeProps => {
              const { noteId } = routeProps.match.params;
              const note = findNote(this.state.notes, noteId);
              return <NotePageMain {...routeProps} note={note} />;
            }}
          />
        </StateContext.Provider>
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
