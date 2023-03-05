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
import { LoginItem } from '~/typings/loginItems';

interface ImageUrlProps {
  item: LoginItem;
}

const IconSelectButton = styled(IconButton)<{ isActive: boolean }>(
  ({ theme, isActive }) => ({
    border: `${theme.borderWidth[1]} solid ${
      isActive ? theme.colors.text : 'transparent'
    }`,
  })
);

const getIconIndxs = () =>
  times(12, () => padStart(String(random(0, 440)), 3, '0') as `${number}`);

export function ImageUrl({ item }: ImageUrlProps) {
  const { register, setValue, watch } = useFormContext();
  const [iconIdxs, setIconIdxs] = useState<`${number}`[]>(getIconIndxs());

  const atLeastXs = useBreakpointsAtLeast('xs');

  useEffect(() => {
    if (register && item.type) {
      register(item.type);
    }
  }, [item.type, register]);

  const selected = watch(item.type) as `${number}`;

  return (
    <>
      <GridBox columns={atLeastXs ? 6 : 3} justifyContent="center">
        {iconIdxs.map((idx, i) => (
          <IconSelectButton
            isActive={selected === `/icons/rpg-icon${idx}.png`}
            key={`${idx}-${i}`}
            size="lg"
            onClick={() => {
              setValue(item.type, `/icons/rpg-icon${idx}.png`);
            }}
          >
            <RpgIcon iconIndex={idx} />
          </IconSelectButton>
        ))}
      </GridBox>
      <TextButton
        label="Shuffle"
        severity="secondary"
        onClick={() => setIconIdxs(getIconIndxs())}
      />
    </>
  );
}
