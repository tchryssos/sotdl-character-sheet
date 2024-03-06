// eslint-disable-next-line import/no-extraneous-dependencies
import { CSSObject } from '@emotion/styled';
import { isPlainObject } from 'lodash';

import {
  ALL_ALLOWED_CSS_PROPS,
  AllowedCustomCssProps,
  AllowedCustomCssSpacingProps,
  CUSTOM_THEME_CSS_PROPS,
  RequiredStyleByBreakpointKeys,
  StyleByBreakpointKeys,
} from '~/constants/css';
import { Theme } from '~/constants/theme';

type CustomCssArgs = {
  currPropKey: keyof typeof CUSTOM_THEME_CSS_PROPS;
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
  ).includes(String(propValue));

  if (propValueIsThemeSubkey) {
    // ... set the value of the prop to the corresponding theme value
    return theme[propCorrespondingThemeKey][
      propValue as keyof Theme[keyof Theme]
    ];
  }
  // ...otherwise, pass it through to the filtered props
  return propValue;
};

const customCssMapping: Record<
  keyof AllowedCustomCssProps,
  (theme: Theme, value: string | number) => CSSObject
> = {
  paddingX: (theme, value) => ({
    paddingLeft: handleThemedCssProps({
      currPropKey: 'paddingLeft',
      theme,
      propValue: value,
    }),
    paddingRight: handleThemedCssProps({
      currPropKey: 'paddingRight',
      theme,
      propValue: value,
    }),
  }),
  marginX: (theme, value) => ({
    marginLeft: handleThemedCssProps({
      currPropKey: 'marginLeft',
      theme,
      propValue: value,
    }),
    marginRight: handleThemedCssProps({
      currPropKey: 'marginRight',
      theme,
      propValue: value,
    }),
  }),
  paddingY: (theme, value) => ({
    paddingTop: handleThemedCssProps({
      currPropKey: 'paddingTop',
      theme,
      propValue: value,
    }),
    paddingBottom: handleThemedCssProps({
      currPropKey: 'paddingBottom',
      theme,
      propValue: value,
    }),
  }),
  marginY: (theme, value) => ({
    marginTop: handleThemedCssProps({
      currPropKey: 'marginTop',
      theme,
      propValue: value,
    }),
    marginBottom: handleThemedCssProps({
      currPropKey: 'marginBottom',
      theme,
      propValue: value,
    }),
  }),
  columns: (_, value) => ({
    gridTemplateColumns: `repeat(${value}, 1fr)`,
  }),
};

type HandleCustomCssArgs = Omit<CustomCssArgs, 'currPropKey'> & {
  currPropKey: keyof AllowedCustomCssProps;
};

const isStyleByBreakpointObj = (value: unknown): boolean => {
  if (!value || (value && !isPlainObject(value))) {
    return false;
  }
  return (
    (value as Record<string, unknown>)[
      'base' as RequiredStyleByBreakpointKeys
    ] !== undefined
  );
};

const handleCustomCssProps = ({
  currPropKey,
  theme,
  propValue,
}: HandleCustomCssArgs): CSSObject => {
  const mappingFn = customCssMapping[currPropKey];
  if (mappingFn) {
    return mappingFn(theme, propValue);
  }
  // pass through to filtered props if no mapping function found
  return {
    [currPropKey]: propValue,
  };
};

type CssPropObj = Partial<CSSObject & AllowedCustomCssSpacingProps>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterCssProps = (props: Record<string, any>, theme: Theme) => {
  let cssPropObj = Object.keys(props).reduce(
    (propObj: CssPropObj, currPropKey) => {
      // Create a copy of the propObj so we don't mutate it
      let nextPropObj = { ...propObj } as CssPropObj;
      const propValue = props[currPropKey];
      if (propValue) {
        // Check if the current prop is a style-by-breakpoint object
        if (isStyleByBreakpointObj(propValue)) {
          const breakpoints = Object.keys(propValue) as StyleByBreakpointKeys[];
          // For each breakpoint...
          breakpoints.forEach((breakpoint) => {
            // ... if that breakpoint is "base", treat it like a regular prop ...
            if (breakpoint === 'base') {
              nextPropObj = {
                ...nextPropObj,
                ...filterCssProps({ [currPropKey]: propValue.base }, theme),
              };
            } else {
              // ...otherwise, get the mediaQuery from the theme and nest the prop
              // under that breakpoint
              const value = propValue[breakpoint];
              if (value !== undefined) {
                nextPropObj = {
                  ...nextPropObj,
                  [theme.breakpoints[breakpoint]]: {
                    ...((nextPropObj[
                      theme.breakpoints[breakpoint]
                    ] as CssPropObj) || {}),
                    ...filterCssProps({ [currPropKey]: value }, theme),
                  },
                };
              }
            }
          });
          // This else always true during a recursive call of this fn due to breakpoints
        } else {
          // Check if the current prop is a custom CSS prop
          // for ex. paddingX, paddingY, etc.
          const usesCustomCss =
            Object.keys(customCssMapping).includes(currPropKey);

          if (usesCustomCss) {
            // If it is, handle it using a helper function
            const customProps = handleCustomCssProps({
              currPropKey: currPropKey as keyof AllowedCustomCssProps,
              theme,
              propValue,
            });
            nextPropObj = { ...nextPropObj, ...customProps };
          } else {
            // Check if it is a custom theme prop
            // aka any prop for which we expect to match a defined theme value
            const usesCustomTheme = Object.keys(
              CUSTOM_THEME_CSS_PROPS
            ).includes(currPropKey);
            if (usesCustomTheme) {
              // If it is, handle it using a helper function
              nextPropObj[currPropKey] = handleThemedCssProps({
                currPropKey: currPropKey as keyof typeof CUSTOM_THEME_CSS_PROPS,
                theme,
                propValue,
              });
            } else if (
              // If it isn't, check if it is a valid CSS prop
              ALL_ALLOWED_CSS_PROPS.includes(
                currPropKey as (typeof ALL_ALLOWED_CSS_PROPS)[number]
              )
            ) {
              // If it is, add it to the propObj
              nextPropObj[currPropKey] = propValue;
            }
          }
        }
      }

      // Return the propObj
      return nextPropObj;
    },
    {} as CssPropObj
  );

  /**
   * Because of how emotion handles media query order
   * we were getting unexpected results when multiple css props
   * with different media queries were all getting parsed.
   *
   * This was leading to styles from smaller breakpoints getting
   * greater specificity than larger breakpoints.
   *
   * This stupid fn reorders the media queries so that the larger queries
   * have greater specificity, and therefore, properly display their styles
   *
   * TODO: We should be able to do this above by just waiting to inject the
   * media queries until the end, but I didn't want to do that now
   * https://github.com/tchryssos/rpg-sheet/issues/204
   */
  Object.values(theme.breakpoints).forEach((breakpoint) => {
    const breakpointStyles = cssPropObj[breakpoint];
    if (breakpointStyles) {
      delete cssPropObj[breakpoint];
      cssPropObj = {
        ...cssPropObj,
        [breakpoint]: breakpointStyles,
      };
    }
  });

  return cssPropObj;
};

export const makeCssPropStyles = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: { theme: Theme } & Record<string, any>
) => {
  const { theme, ...rest } = props;
  return filterCssProps(rest, theme);
};
