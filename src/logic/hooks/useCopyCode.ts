import clipboardCopy from 'clipboard-copy';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetCharacterCode } from './useGetCharacterCode';

export const useCopyCode = (
  setCopySuccess?: (wasCopySuccessful: boolean) => void
) => {
  const { handleSubmit } = useFormContext();
  const code = useGetCharacterCode();

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
