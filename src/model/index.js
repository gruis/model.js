const cast = (Type, value) => {
  if (Type === null) {
    return value;
  }
  const v = value === undefined ? new Type() : new Type(value);
  if (Type === Date) {
    return v;
  }
  return v.valueOf();
};

class Model {
  constructor (values) {
    this.values = values;
  }

  valueOf () {
    const values = this.values || {};
    const attrs = this.attributes();
    const parsed = Object.keys(attrs).reduce((raw, key) => {
      const type = attrs[key];
      raw[key] = cast(type, values[key]);
      return raw;
    }, {});
    return parsed;
  }
}
export default Model;
