import { Page } from "@quickwire/core";
import Note from "../../components/note.tsx";

export default Page({
  render({ params }) {
    return (
      <>
        <h1>Notes</h1>
        <Note
          note={{ id: Number(params.id), title: "Title", contents: "Contents" }}
        />
      </>
    );
  },
});
