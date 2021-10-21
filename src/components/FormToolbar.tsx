import styled from '@emotion/styled';
import clipboardCopy from 'clipboard-copy';
import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ColorMode } from '~/constants/theme';
import { ThemeContext } from '~/logic/contexts/themeContext';

import { FlexBox } from './box/FlexBox';
import { IconButton } from './buttons/IconButton';
import { CharacterCodeForm } from './CharacterCodeForm';
import { ClipboardCopy } from './icons/ClipboardCopy';
import { ClipboardCopyFail } from './icons/ClipboardCopyFail';
import { ClipboardCopySuccess } from './icons/ClipboardCopySuccess';
import { Moon } from './icons/Moon';
import { Pencil } from './icons/Pencil';
import { Sun } from './icons/Sun';
import { Upload } from './icons/Upload';

// START - Icons and Buttons - START
const colorToggleObj: Record<ColorMode, ColorMode> = {
  light: 'dark',
  dark: 'light',
};

const ColorModeToggle = () => {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  const onSwitch = () => {
    setColorMode(colorToggleObj[colorMode]);
  };

  return (
    <IconButton onClick={onSwitch}>
      {colorMode === 'light' ? (
        <Sun title="Light mode" titleId="light-mode-icon" />
      ) : (
        <Moon title="Dark mode" titleId="dark-mode-icon" />
      )}
    </IconButton>
  );
};

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
    const code = window.btoa(JSON.stringify(valueObj));
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

// START - Toolbar - START
const Toolbar = styled(FlexBox)<{ isExpanded: boolean }>(({ theme }) => ({
  position: 'fixed',
  backgroundColor: theme.colors.background,
  top: 0,
  left: 0,
  width: '100%',
  padding: theme.spacing[16],
  borderBottom: `${theme.border.borderWidth[1]} solid ${theme.colors.text}`,
  boxShadow: `${theme.colors.smudge} 0 ${theme.spacing[4]}`,
  [theme.breakpoints.sm]: {
    padding: `${theme.spacing[16]} ${theme.spacing[32]}`,
  },
  zIndex: 100,
}));

const InnerToolbar = styled(FlexBox)(({ theme }) => ({
  maxWidth: theme.breakpointValues.lg,
}));

interface FormToolbarProps {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}

export const FormToolbar: React.FC<FormToolbarProps> = ({
  isEditMode,
  setIsEditMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Toolbar center flex={1} isExpanded={isExpanded}>
      <InnerToolbar alignItems="flex-end" column flex={1}>
        <FlexBox gap={16}>
          <ColorModeToggle />
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
        </FlexBox>
        <CharacterCodeForm isVisible={isExpanded} />
      </InnerToolbar>
    </Toolbar>
  );
};
// END - Toolbar - END
