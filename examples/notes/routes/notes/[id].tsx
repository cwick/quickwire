import { Component } from "@quickwire/core";
export default Component({
  render({ params }) {
    return (
      <>
        <h1>Notes</h1>
        This is Note {params.id}
      </>
    );
  },
});
