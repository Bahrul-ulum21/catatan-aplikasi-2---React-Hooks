import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailPageAction from "../components/DetailPageAction";
import { deleteNote, getNote, } from "../utils/api";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    navigate("/");
  };
   useEffect(() => {
    const fetchGetNotes = async () => {
      const { data } = await getNote(id);
      setNotes(data);
    };
    fetchGetNotes();
  }, [id]);

  return (
    <section className='detail-page'>
      <h3 className='detail-page__title'>{notes.title}</h3>
      <div className='detail-page__body'>{notes.body}</div>
      <DetailPageAction
        id={notes.id}
        deleteNote={onDeleteHandler}
      />
    </section>
  );
}

export default DetailPageWrapper;