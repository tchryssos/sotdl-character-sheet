import clipboardCopy from 'clipboard-copy';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { FIELD_NAMES } from '~/constants/form';
import { EditContext } from '~/logic/contexts/editContext';
import { NavContext } from '~/logic/contexts/navContext';

import { IconButton } from '../buttons/IconButton';
import { ClipboardCopy } from '../icons/ClipboardCopy';
import { ClipboardCopyFail } from '../icons/ClipboardCopyFail';
import { ClipboardCopySuccess } from '../icons/ClipboardCopySuccess';
import { Pencil } from '../icons/Pencil';
import { Upload } from '../icons/Upload';

interface CopyIconProps {
  copySuccess?: boolean;
}

const CopyIcon: React.FC<CopyIconProps> = ({ copySuccess }) => {
  if (copySuccess) {
    return (
      <ClipboardCopySuccess
        color="success"
        title="Copy success"
        titleId="copy-success-icon"
      />
    );
  }
  if (copySuccess === false) {
    return (
      <ClipboardCopyFail
        color="danger"
        title="Copy failed"
        titleId="copy-failed-icon"
      />
    );
  }
  return <ClipboardCopy title="Copy" titleId="copy-icon" />;
};

const CopyButton: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState<boolean | undefined>();
  const { getValues, formState, handleSubmit, reset } = useFormContext();
  const { isDirty } = formState;

  const copyCode = async () => {
    const valueObj = getValues();
    const code = window.btoa(encodeURIComponent(JSON.stringify(valueObj)));
    try {
      await clipboardCopy(code);
      return handleSubmit(async () => setCopySuccess(true))();
    } catch (e) {
      return setCopySuccess(false);
    }
  };

  useEffect(() => {
    if (isDirty) {
      setCopySuccess(undefined);
    }
  }, [isDirty]);

  useEffect(() => {
    if (copySuccess && reset && getValues) {
      const valueObj = getValues();
      reset(valueObj, { keepValues: true });
    }
  }, [copySuccess, reset, getValues]);

  return (
    <IconButton type="submit" onClick={copyCode}>
      <CopyIcon copySuccess={copySuccess} />
    </IconButton>
  );
};
// END - Icons and Buttons - End

interface NavButtonsProps {
  setIsExpanded: (isExpanded: boolean) => void;
  isExpanded: boolean;
}

const NavButtons: React.FC<NavButtonsProps> = ({
  setIsExpanded,
  isExpanded,
}) => {
  const { isEditMode, setIsEditMode } = useContext(EditContext);
  return (
    <>
      <IconButton onClick={() => setIsExpanded(!isExpanded)}>
        <Upload
          color={isExpanded ? 'success' : undefined}
          title="Upload code"
          titleId="upload-code-icon"
        />
      </IconButton>
      <CopyButton />
      <IconButton onClick={() => setIsEditMode(!isEditMode)}>
        <Pencil
          color={isEditMode ? 'success' : 'text'}
          title="Edit pencil"
          titleId="edit-pencil-icon"
        />
      </IconButton>
    </>
  );
};

export const FormNav: React.FC = () => {
  const { watch } = useFormContext();
  const name = watch(FIELD_NAMES.name);
  const ancestry = watch(FIELD_NAMES.ancestry);
  const novicePath = watch(FIELD_NAMES.paths.novice_path);
  const expertPath = watch(FIELD_NAMES.paths.expert_path);
  const masterPath = watch(FIELD_NAMES.paths.master_path);

  const { portalRef, setNavExpanded, isNavExpanded, setNavTitle } =
    useContext(NavContext);

  useEffect(() => {
    const titleClass = masterPath || expertPath || novicePath || '';
    const title = `${name}${
      ancestry ? ` - ${ancestry}${titleClass ? ` ${titleClass}` : ''}` : ''
    }`;
    setNavTitle(title);
  }, [name, ancestry, novicePath, expertPath, masterPath, setNavTitle]);

  if (portalRef.current) {
    return createPortal(
      <NavButtons isExpanded={isNavExpanded} setIsExpanded={setNavExpanded} />,
      portalRef.current
    );
  }
  return null;
};
