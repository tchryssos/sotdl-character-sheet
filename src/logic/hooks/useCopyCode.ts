import clipboardCopy from 'clipboard-copy';
import { useFormContext } from 'react-hook-form';

import { useGetCharacterCode } from './useGetCharacterCode';

export const useCopyCode = (
  setCopySuccess?: (wasCopySuccessful: boolean) => void
) => {
  const { handleSubmit } = useFormContext();
  const code = useGetCharacterCode();

  const copyCode = async () => {
    try {
      await clipboardCopy(code);
      return handleSubmit(async () => setCopySuccess?.(true))();
    } catch (e) {
      return setCopySuccess?.(false);
    }
  };
  return { copyCode };
};
