export const decodeCharacterObj = (characterCodeString: string) => {
  const objString = window.atob(characterCodeString);
  const characterObj: Record<string, unknown> = JSON.parse(
    decodeURIComponent(objString)
  );
  return characterObj;
};
