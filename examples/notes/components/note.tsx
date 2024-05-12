type Note = { id: number; title: string; contents: string };

export default function ({ note }: { note: Note }) {
  return <>This is Note {note.id}</>;
}
