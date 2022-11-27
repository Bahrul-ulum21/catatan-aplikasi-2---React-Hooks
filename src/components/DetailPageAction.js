import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function DetailPageAction({ id, title, deleteNote }) {
  const onDeleteNoteHandler = () => {
    Swal.fire({
      title: `Hapus catatan "${title}"?`,
      text: "Apakah kamu yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).
    then((result) => {
      if (result.isConfirmed) {
        deleteNote(id);
      }
    });
  };
  return (
    <div>
<button className='contact-item__delete' 
  onClick={() => onDeleteNoteHandler(id)}>HAPUS</button>
  </div>
  )
}

DetailPageAction.propType = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default DetailPageAction;
