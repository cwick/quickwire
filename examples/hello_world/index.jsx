console.log("hello world example");

const f = () => "c";
const World = () => <h1>World</h1>;
const Hello = () => (
  <>
    <h1 className={`a b ${f()}`}>Hello</h1>
    <World />
  </>
);

console.log(Hello());
export default Hello;
