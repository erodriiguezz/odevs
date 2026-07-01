export default <
  K extends string,
  V extends Record<K, string>
>(
  prop: K,
  obj: Record<string, Omit<V, K>>
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