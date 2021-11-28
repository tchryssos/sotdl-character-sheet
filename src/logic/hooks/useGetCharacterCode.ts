import { useFormContext } from 'react-hook-form';

export const useGetCharacterCode = () => {
  const { getValues } = useFormContext();
  const valueObj = getValues();
  // See https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
  if (typeof window !== 'undefined') {
    return window.btoa(encodeURIComponent(JSON.stringify(valueObj)));
  }
  return '';
};
