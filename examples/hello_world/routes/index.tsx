type ComponentFunction = (...args: unknown[]) => unknown;
type DataProps<T extends ComponentFunction> = {
  data: ReturnType<T>;
};

export function data() {
  return { title: "Page title" };
}

export default function Index(props: DataProps<typeof data>) {
  return (
    <>
      <h1>{props.data.title}</h1>
      <a href="second">Click here</a> to go to the second page.
    </>
  );
}
