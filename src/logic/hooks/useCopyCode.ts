import clipboardCopy from 'clipboard-copy';
import { useFormContext } from 'react-hook-form';

export const useCopyCode = (
  setCopySuccess?: (wasCopySuccessful: boolean) => void
) => {
  const { getValues, handleSubmit } = useFormContext();

  const copyCode = async () => {
    const valueObj = getValues();
    const code = window.btoa(encodeURIComponent(JSON.stringify(valueObj)));
    try {
      await clipboardCopy(code);
      return handleSubmit(async () => setCopySuccess?.(true))();
    } catch (e) {
      return setCopySuccess?.(false);
    }
  };
  return { copyCode };
};
