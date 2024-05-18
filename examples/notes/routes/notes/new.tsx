import { Page } from "@quickwire/core";

export default Page({
  render() {
    return (
      <>
        <h1>New note</h1>
        <form method="post">
          <textarea name="content"></textarea>
          <button type="submit">Create</button>
        </form>
      </>
    );
  },
});
