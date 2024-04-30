import { describe, it, assertSnapshot } from "./testing.ts";
import Index from "./index.tsx";

describe("index.tsx", () => {
  it("renders", async (t) => {
    const result = Index({ children: "body" });
    await assertSnapshot(t, result);
  });
});
