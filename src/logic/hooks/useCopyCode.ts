import clipboardCopy from 'clipboard-copy';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export const useCopyCode = (
  setCopySuccess?: (wasCopySuccessful: boolean) => void
) => {
  const { handleSubmit, getValues } = useFormContext();
  const data = getValues() as CharacterData;
  const code =
    globalThis.btoa?.(encodeURIComponent(JSON.stringify(data))) || '';

  const copyCode = useCallback(async () => {
    try {
      await clipboardCopy(code);
      return handleSubmit(async () => setCopySuccess?.(true))();
    } catch (e) {
      return setCopySuccess?.(false);
    }
  }, [code, handleSubmit, setCopySuccess]);

  return copyCode;
};
