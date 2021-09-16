const isUSConfig = (entry: any): entry is USConfig => {
  // TODO
  return true;
};

export const validateJSON = (input: any) => {
  const json = JSON.parse(input);
  if (!Array.isArray(json)) throw Error();
  if (!json.every(isUSConfig)) throw Error();

  return json;
};
