export const validate_complex = (
  name: string,
  obj: { [key: string]: any },
  rules: { [key: string]: { rule: (thing: any) => boolean, optional?: boolean }}
): string[] => {
  let invalid: string[] = [];

  Object.keys(rules).forEach((key) => {
    if (obj[key] === undefined) {
      if (!rules[key].optional) {
        invalid.push(`${name}.${key}`);
        return false;
      } else {
        return true;
      }
    }

    if (!rules[key].rule(obj[key])) {
      invalid.push(`${name}.${key}`);
      return false;
    }
  });

  return invalid;
}

export const is_string = (thing: any): boolean => typeof(thing) === 'string';
export const is_number = (thing: any): boolean => typeof(thing) === 'number' && !isNaN(thing);
export const is_boolean = (thing: any): boolean => typeof(thing) === 'boolean';
export const is_string_not_empty = (thing: any): boolean => is_string(thing) && thing.length > 0;