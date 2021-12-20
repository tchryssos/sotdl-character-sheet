import { useFormContext } from 'react-hook-form';

export const useGetCharacterCode = () => {
  const { getValues } = useFormContext();
  const valueObj = getValues();
  return globalThis.btoa?.(encodeURIComponent(JSON.stringify(valueObj))) || '';
};
