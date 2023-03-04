import { DangerousSvgIcon } from './DangerousSvgIcon';

interface RpgIconProps {
  iconIndex: `${number}${number}${number}`;
  className?: string;
}

export function RpgIcon({ iconIndex, className }: RpgIconProps) {
  return (
    <DangerousSvgIcon
      className={className}
      role="img"
      url={`/icons/rpg-icon${iconIndex}.svg`}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    />
  );
}
