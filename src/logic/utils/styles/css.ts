// eslint-disable-next-line import/no-extraneous-dependencies
import * as CSS from 'csstype';

import {
  ALL_ALLOWED_CSS_PROPS,
  AllowedCssProps,
  AllowedCustomCssSpacingProps,
  CUSTOM_THEME_CSS_PROPS,
} from '~/constants/css';
import { Theme } from '~/constants/theme';

type CustomCssArgs = {
  currPropKey: keyof AllowedCssProps;
  theme: Theme;
  propValue: string | number;
};

const handleThemedCssProps = ({
  currPropKey,
  theme,
  propValue,
}: CustomCssArgs) => {
  // Get the corresponding theme key...
  const propCorrespondingThemeKey = CUSTOM_THEME_CSS_PROPS[currPropKey]!;
  // ... and if the value of the prop exists in the theme for that key...
  const propValueIsThemeSubkey = Object.keys(
    theme[propCorrespondingThemeKey]
  ).includes(propValue as string);
  if (propValueIsThemeSubkey) {
    // ... set the value of the prop to the corresponding theme value
    return theme[propCorrespondingThemeKey][
      propValue as keyof Theme[keyof Theme]
    ];
  }
  // ...otherwise, pass it through to the filtered props
  return propValue;
};

// const handleCustomCssProps = ({
//   currPropKey,
//   theme,
//   propValue,
// }: CustomCssArgs) => {};

export const filterCssProps = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>,
  theme: Theme
) =>
  Object.keys(props).reduce((propObj, currPropKey) => {
    const nextPropObj = { ...propObj } as Record<string, unknown>;
    // If the prop is one of the css props that uses the custom theme...
    const usesCustomTheme = Object.keys(CUSTOM_THEME_CSS_PROPS).includes(
      currPropKey
    );
    if (usesCustomTheme) {
      nextPropObj[currPropKey] = handleThemedCssProps({
        currPropKey: currPropKey as keyof AllowedCssProps,
        theme,
        propValue: props[currPropKey],
      });
    } else if ((ALL_ALLOWED_CSS_PROPS as string[]).includes(currPropKey)) {
      nextPropObj[currPropKey] = props[currPropKey];
    }
    return nextPropObj;
  }, {} as Partial<CSS.Properties & AllowedCustomCssSpacingProps>);

export const makeCssPropStyles = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: { theme: Theme } & Record<string, any>
) => {
  const { theme, ...rest } = props;
  return filterCssProps(rest, theme);
};
