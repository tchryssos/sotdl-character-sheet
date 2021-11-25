import { useFormContext } from 'react-hook-form';

export const useGetCharacterCode = () => {
  const { getValues } = useFormContext();
  const valueObj = getValues();
  return window.btoa(encodeURIComponent(JSON.stringify(valueObj)));
};
