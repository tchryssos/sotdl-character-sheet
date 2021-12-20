export const decodeCharacterObj = (characterCodeString: string) => {
  const objString = globalThis.atob(characterCodeString);
  const characterObj: Record<string, unknown> = JSON.parse(
    decodeURIComponent(objString)
  );
  return characterObj;
};
