import { Page } from "@quickwire/core";

export default Page({
  render() {
    return new Response(null, { status: 303, headers: { Location: "/" } });
  },
});
