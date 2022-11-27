import React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { deleteNote, getActiveNotes } from "../utils/api";


function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });
  return (
    <main>
      <center><h1>Catatan Tersedia</h1></center>
      <section className='homepage'>
        <section className='search-bar'>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
          </section>
          <NoteList notes={filteredNotes} onDelete={onDeleteHandler} />
       </section>
    </main>
  );
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
};

export default HomePage;



// function HomePageWrapper() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const keyword = searchParams.get("keyword");
//   function changeSearchParams(keyword) {
//     setSearchParams({ keyword });
//   }

//   return (
//     <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
//   );
// }

// class HomePage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       notes: getActiveNotes(),
//       keyword: props.defaultKeyword || "",
//     };

//     this.onDeleteHandler = this.onDeleteHandler.bind(this);
//     this.onKeywordHandler = this.onKeywordHandler.bind(this);
//   }

//   onDeleteHandler(id) {
//     deleteNote(id);

//     //update the note state from data.js
//     this.setState(() => {
//       return {
//         notes: getActiveNotes(),
//       };
//     });
//   }

//   onKeywordHandler(keyword) {
//     this.setState(() => {
//       return {
//         keyword,
//       };
//     });
//     this.props.keywordChange(keyword);
//   }

//   render() {
//     const notes = this.state.notes.filter((note) => {
//       return note.title
//         .toLowerCase()
//         .includes(this.state.keyword.toLowerCase());
//     });

    // return (
    //   <main>
    //     <section className='homepage'>
    //       <section className='search-bar'>
    //         <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordHandler}/>
    //         </section>
    //         <NoteList notes={notes} onDelete={this.onDeleteHandler} />
    //      </section>
    //   </main>
    // );
//   }
// }

// HomePage.proptype = {
//   defaultKeyword: PropTypes.string,
//   keywordChange: PropTypes.func.isRequired,
// };

// export default HomePage;
