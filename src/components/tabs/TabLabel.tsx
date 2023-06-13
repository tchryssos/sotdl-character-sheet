import styled from '@emotion/styled';
import { Tab as MuiTab, tabClasses } from '@mui/base';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { Box } from '../box/Box';
import { RpgIcon } from '../icons/RpgIcon';
import { Text } from '../Text';
import type { TabLabelObject } from './types';

const Tab = styled(MuiTab)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing[8],
  alignItems: 'center',
  backgroundColor: theme.colors.accentHeavy,
  color: theme.colors.text,
  borderRadius: 0,
  borderColor: theme.colors.textAccent,
  borderStyle: 'solid',
  borderWidth: theme.borderWidth[1],
  cursor: 'pointer',
  padding: theme.spacing[8],
  [`&.${tabClasses.selected}`]: {
    backgroundColor: theme.colors.background,
  },
}));

interface TabLabelProps {
  label: TabLabelObject;
  index: number;
}

const labelIconSize = 18;

export function TabLabel({ label, index }: TabLabelProps) {
  return (
    <Tab value={index}>
      <Text variant="body">{label.label}</Text>
      {label.icon && (
        <Box height={pxToRem(labelIconSize)} width={pxToRem(labelIconSize)}>
          <RpgIcon iconIndex={label.icon} />
        </Box>
      )}
    </Tab>
  );
}
