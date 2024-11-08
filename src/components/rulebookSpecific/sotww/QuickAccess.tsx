import styled from '@emotion/styled';
import { throttle, trim } from 'lodash';
import {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';

import { FlexBox } from '~/components/box/FlexBox';
import { GridBox } from '~/components/box/GridBox';
import { IconButton } from '~/components/buttons/IconButton';
import { FormSection } from '~/components/form/containers/FormSection';
import { Pin } from '~/components/icons/Pin';
import { BodyContainer } from '~/components/meta/BodyContainer';
import { Text } from '~/components/Text';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { SotwwCharacterData } from '~/typings/sotww/characterData';

import { DefenseContext } from './DefenseProvider';

const LongEffect = styled(Text)`
  white-space: pre-line;
`;

const PinButton = styled(IconButton)`
  position: absolute;
  top: ${pxToRem(40)};
  right: ${pxToRem(8)};
`;

const QuickSection = styled(FormSection, {
  shouldForwardProp: (prop) => prop !== 'fixed',
})(({ theme }) => ({
  backgroundImage: `linear-gradient(to bottom, transparent 0, ${theme.colors.background} 10%, ${theme.colors.background} 100%)`,

  height: 'fit-content',
  width: '100%',
}));

interface QuickKeyValProps {
  label: string;
  value: string;
  longVal?: boolean;
}
function QuickKeyVal({ label, value, longVal }: QuickKeyValProps) {
  if (longVal) {
    return (
      <FlexBox flexDirection="column">
        <Text>{label}:</Text>
        <LongEffect color="textAccent" variant="body-xs">
          {value}
        </LongEffect>
      </FlexBox>
    );
  }
  return (
    <Text>
      {label}: <Text color="textAccent">{value}</Text>
    </Text>
  );
}

const qaId = 'quick-access';

function FixedWrapper({
  children,
  fixed,
}: PropsWithChildren<{ fixed: boolean }>) {
  if (fixed) {
    return (
      <BodyContainer
        left={0}
        position="fixed"
        right={0}
        width="100%"
        zIndex={2}
      >
        {children}
      </BodyContainer>
    );
  }
  return <>{children}</>;
}

export function QuickAccess() {
  const { watch } = useFormContext<SotwwCharacterData>();
  const { totalDefense, recalculateDefense } = useContext(DefenseContext);
  const [fixed, setFixed] = useState(false);
  const [height, setHeight] = useState(0);

  const equippedWeapon = watch('weapons').filter((w) => w.weapon_equipped);
  const weaponText = equippedWeapon
    ? equippedWeapon
        .map((w) => `${w.weapon_name} ${w.weapon_damage}`)
        .join(' / ')
    : 'Unarmed 1d6';
  const equippedArmor = watch('armors').filter((a) => a.armor_equipped);
  const equippedArmorText = equippedArmor.map((a) => a.armor_name).join(', ');
  const damage = watch('damage');
  const health = watch('health_current');
  const conditions = watch('conditions');
  const boonBane = watch('boons_and_banes');
  const bonusDamage = watch('bonus_attack_damage');

  useEffect(() => {
    recalculateDefense();
  }, [recalculateDefense]);

  const getAndSetHeight = useMemo(
    () =>
      throttle(() => {
        const h = document.getElementById(qaId)?.clientHeight || 0;
        setHeight(h);
      }, 250),
    []
  );

  useEffect(() => {
    if (fixed) {
      getAndSetHeight();
    }
  }, [
    getAndSetHeight,
    weaponText,
    equippedArmorText,
    boonBane,
    conditions,
    fixed,
  ]);

  useEffect(() => {
    if (fixed) {
      window.addEventListener('resize', getAndSetHeight);
    }
    return () => {
      window.removeEventListener('resize', getAndSetHeight);
    };
  }, [getAndSetHeight, fixed]);

  return (
    <>
      {fixed && <div style={{ height }} />}
      <FixedWrapper fixed={fixed}>
        <QuickSection
          borderColor="primary"
          columns={1}
          id={qaId}
          isCollapsible={false}
          title="Quick Access"
        >
          <GridBox
            gap={8}
            gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', lg: '1fr 2fr' }}
          >
            <FlexBox flexDirection="column" gap={8}>
              <QuickKeyVal label="Damage" value={`${damage}/${health}`} />
              <QuickKeyVal label="Weapon" value={weaponText} />
              {trim(bonusDamage) && (
                <QuickKeyVal
                  label="Bonus Atk Damage"
                  value={`+${bonusDamage}`}
                />
              )}
              <QuickKeyVal
                label="Defense"
                value={`${totalDefense} (${
                  equippedArmorText || 'Natural Defense'
                })`}
              />
            </FlexBox>

            <GridBox columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 16 }}>
              {trim(boonBane) && (
                <QuickKeyVal label="Boons/Banes" longVal value={boonBane} />
              )}
              {trim(conditions) && (
                <QuickKeyVal label="Conditions" longVal value={conditions} />
              )}
            </GridBox>
          </GridBox>
          <PinButton
            onClick={() => {
              getAndSetHeight();
              setFixed(!fixed);
            }}
          >
            <Pin color={fixed ? 'primary' : 'text'} title="Pin Quick Access" />
          </PinButton>
        </QuickSection>
      </FixedWrapper>
    </>
  );
}
