import { DataProps } from "@quickwire/core";

type Note = { id: number; title: string; contents: string };

export function data(): Note[] {
  return [
    { id: 1, title: "First note", contents: "First" },
    { id: 2, title: "Second note", contents: "Second" },
    { id: 3, title: "Third note", contents: "Third" },
  ];
}

export default function Index(props: DataProps<typeof data>) {
  return (
    <>
      <h1>Notes</h1>
      <ul>
        {props.data.map((note) => (
          <li key={note.id}>
            <a href={`notes/${note.id}`}>{note.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
