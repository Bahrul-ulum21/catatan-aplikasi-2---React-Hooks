import React from 'react';
import PropTypes from 'prop-types';

class NoteInput extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     title: '',
     body: '',
   }
 
   this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
   this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
   this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
 }
 
 onTitleChangeEventHandler(event) {
   this.setState(() => {
     return {
       title: event.target.value,
     }
   });
 }
 
 onBodyChangeEventHandler(event) {
   this.setState(() => {
     return {
       body: event.target.value,
     }
   });
 }
 
 onSubmitEventHandler(event) {
   event.preventDefault();
   this.props.addNote(this.state);
 } 

 render() {
    return (
      <form className='note-input' onSubmit={this.onSubmitEventHandler}>
       <input type="text" placeholder="Title (Max 50Character)" value={this.state.title} onChange={this.onTitleChangeEventHandler} required maxLength={50} />
        <input type="text" placeholder="atulis Catatanmu....." value={this.state.body} onChange={this.onBodyChangeEventHandler} required/>
        <button type="submit">Tambah</button>
      </form>
    )
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
 }

export default NoteInput;