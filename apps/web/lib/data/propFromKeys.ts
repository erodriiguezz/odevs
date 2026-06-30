export default <
  K extends string,
  V extends Record<K, string>
>(
  prop: string,
  obj: Record<string, { [P in keyof V as P extends K ? never : P]: V[P] }>
) => {
  const result = {} as Record<string, V>;

  Object.keys(obj).forEach((key) => {
    result[key] = {
      ...obj[key],
      [prop]: key,
    } as unknown as V;
  });

  return result;
};