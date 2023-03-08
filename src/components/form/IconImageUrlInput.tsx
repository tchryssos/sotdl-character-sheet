/* eslint-disable react/no-array-index-key */
import styled from '@emotion/styled';
import { padStart, random, times } from 'lodash';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { IconButton } from '~/components/buttons/IconButton';
import { TextButton } from '~/components/buttons/TextButton';
import { RpgIcon } from '~/components/icons/RpgIcon';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { getIconIdxFromUrl } from '~/logic/user';

const IconSelectButton = styled(IconButton)<{ isActive: boolean }>(
  ({ theme, isActive }) => ({
    border: `${theme.borderWidth[1]} solid ${
      isActive ? theme.colors.text : 'transparent'
    }`,
  })
);

const getIconIndxs = (current?: `${number}`) => [
  ...(current ? [current] : []),
  ...times(
    current ? 11 : 12,
    () => padStart(String(random(0, 440)), 3, '0') as `${number}`
  ),
];

interface ImageUrlInputProps {
  name: string;
}

export function IconImageUrlInput({ name }: ImageUrlInputProps) {
  const { register, setValue, watch } = useFormContext();

  const selected = watch(name) as `${number}`;
  const [iconIdxs, setIconIdxs] = useState<`${number}`[]>(
    getIconIndxs(getIconIdxFromUrl(selected))
  );

  const atLeastXs = useBreakpointsAtLeast('xs');

  useEffect(() => {
    if (register && name) {
      register(name);
    }
  }, [name, register]);

  return (
    <>
      <GridBox columns={atLeastXs ? 6 : 3} justifyContent="center">
        {iconIdxs.map((idx, i) => (
          <IconSelectButton
            isActive={
              `/icons/rpg-icon${getIconIdxFromUrl(selected)}.svg` ===
              `/icons/rpg-icon${idx}.svg`
            }
            key={`${idx}-${i}`}
            size="lg"
            onClick={() => {
              setValue(name, `/icons/rpg-icon${idx}.svg`);
            }}
          >
            <RpgIcon iconIndex={idx} />
          </IconSelectButton>
        ))}
      </GridBox>
      <TextButton
        label="Shuffle"
        severity="secondary"
        onClick={() => setIconIdxs(getIconIndxs(getIconIdxFromUrl(selected)))}
      />
    </>
  );
}
