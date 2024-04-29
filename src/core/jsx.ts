// TODO: finish implementing these methods
export function jsxTemplate(
  strings: string[],
  ...dynamic: (
    | string
    | {
        type: (props: object) => void;
        props: { [key: string]: unknown };
        key?: string;
      }
  )[]
) {
  let output = "";
  strings.forEach((string, index) => {
    output += string;
    if (index < dynamic.length) {
      const value = dynamic[index];
      if (typeof value === "string") {
        output += dynamic[index];
      } else {
        output += value.type(value.props ?? {});
      }
    }
  });
  return output;
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
