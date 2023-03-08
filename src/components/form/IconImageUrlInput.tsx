/* eslint-disable react/no-array-index-key */
import styled from '@emotion/styled';
import { padStart, random, times } from 'lodash';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GridBox } from '~/components/box/GridBox';
import { getIconButtonSize, IconButton } from '~/components/buttons/IconButton';
import { RpgIcon } from '~/components/icons/RpgIcon';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { getIconIdxFromUrl } from '~/logic/user';

import { BaseButton } from '../buttons/BaseButton';
import { Refresh } from '../icons/Refresh';
import { Text } from '../Text';

const iconListId = 'icon-list';

const IconSelectLi = styled.li`
  width: 'fit-content';
`;

const IconSelectButton = styled(IconButton)<{ isActive: boolean }>(
  ({ theme, isActive }) => ({
    border: `${theme.borderWidth[1]} solid ${
      isActive ? theme.colors.text : 'transparent'
    }`,
  })
);

const ShuffleButton = styled(BaseButton)`
  height: 100%;
  width: ${({ theme }) => getIconButtonSize('lg', theme)};
`;

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
      <Text as="label" fontWeight="bold" id={iconListId} variant="body-sm">
        User Icon
      </Text>
      <GridBox gridTemplateColumns="1fr auto">
        <ul aria-labelledby={iconListId}>
          <GridBox columns={atLeastXs ? 6 : 3} justifyContent="center">
            {iconIdxs.map((idx, i) => (
              <IconSelectLi key={`${idx}-${i}`}>
                <IconSelectButton
                  isActive={
                    // I messed up some of the initial icons and saved them with .png
                    // so we just need to extract the number from the url
                    // rather than do an === with selected
                    `/icons/rpg-icon${getIconIdxFromUrl(selected)}.svg` ===
                    `/icons/rpg-icon${idx}.svg`
                  }
                  size="lg"
                  onClick={() => {
                    setValue(name, `/icons/rpg-icon${idx}.svg`);
                  }}
                >
                  <RpgIcon iconIndex={idx} />
                </IconSelectButton>
              </IconSelectLi>
            ))}
          </GridBox>
        </ul>
        <ShuffleButton
          onClick={() => setIconIdxs(getIconIndxs(getIconIdxFromUrl(selected)))}
        >
          <Refresh title="Shuffle Icons" />
        </ShuffleButton>
      </GridBox>
    </>
  );
}
