type JSXProps = { [key: string]: unknown };
type JSXElement<T extends JSXProps> = {
  type: (props: T) => string;
  props: T;
  key?: string;
};

type DynamicElement<T extends JSXProps> = string | number | JSXElement<T>;

export function jsxTemplate<T extends JSXProps>(
  strings: string[],
  ...dynamic: (DynamicElement<T> | DynamicElement<T>[])[]
) {
  let output = "";
  strings.forEach((string, index) => {
    output += string;
    if (index < dynamic.length) {
      const value = dynamic[index];
      if (typeof value === "string" || typeof value === "number") {
        output += value;
      } else if (Array.isArray(value)) {
        value.forEach((e) => {
          if (typeof e === "string" || typeof e === "number") {
            output += e;
          } else {
            output += jsxElementToString(e);
          }
        });
      } else {
        output += jsxElementToString(value);
      }
    }
  });
  return output;
}

function jsxElementToString<T extends JSXProps>(e: JSXElement<T>) {
  return e.type(e.props);
}

export function jsxAttr(name: string, value: unknown) {
  return `${name}="${value}"`;
}
export function jsxEscape(value: unknown) {
  return value;
}

export function jsx(type: unknown, props: unknown, key: unknown) {
  return { type, props, key };
}
