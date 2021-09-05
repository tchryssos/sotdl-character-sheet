import { Body } from '~/components/typography/Body';

interface LabelProps {
  labelFor?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  labelFor,
  label,
  className,
  children,
}) =>
  label && labelFor ? (
    <label className={className} htmlFor={labelFor}>
      <Body>{label}</Body>
      {children}
    </label>
  ) : (
    <>{children}</>
  );
