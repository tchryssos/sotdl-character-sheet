import { padStart, random, times } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { IconButton } from '~/components/buttons/IconButton';
import { TextButton } from '~/components/buttons/TextButton';
import { RpgIcon } from '~/components/icons/RpgIcon';
import { useBreakpointsAtLeast } from '~/logic/hooks/useBreakpoints';
import { LoginItem } from '~/typings/loginItems';

interface ImageUrlProps {
  item: LoginItem;
}

const getIconIndxs = () =>
  times(12, () => padStart(String(random(0, 440)), 3, '0') as `${number}`);

export function ImageUrl({ item }: ImageUrlProps) {
  const { register, setValue } = useFormContext();
  const [iconIdxs, setIconIdxs] = useState<`${number}`[]>(getIconIndxs());

  const atLeastXs = useBreakpointsAtLeast('xs');

  useEffect(() => {
    if (register && item.type) {
      register(item.type);
    }
  }, [item.type, register]);

  return (
    <>
      <GridBox columns={atLeastXs ? 6 : 3} justifyContent="center">
        {iconIdxs.map((idx) => (
          <IconButton
            key={idx}
            size="lg"
            onClick={() => {
              setValue(item.type, `/icons/rpg-icon${idx}.png`);
            }}
          >
            <RpgIcon iconIndex={idx} />
          </IconButton>
        ))}
      </GridBox>
      <TextButton label="Shuffle" onClick={() => setIconIdxs(getIconIndxs())} />
    </>
  );
}
