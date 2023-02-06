import { UserProvider } from '@auth0/nextjs-auth0';
import { css, Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import type { AppProps } from 'next/app';
import { useEffect, useMemo, useState } from 'react';

import { FlexBox } from '~/components/box/FlexBox';
import { NotificationsContextProvider } from '~/components/providers/NotificationsContextProvider';
import { ColorMode, Theme, themes } from '~/constants/theme';
import { BreakpointsContext } from '~/logic/contexts/breakpointsContext';
import { ThemeContext } from '~/logic/contexts/themeContext';
import { pxToRem } from '~/logic/utils/styles/pxToRem';
import { BreakpointSize } from '~/typings/theme';

const marPadZero = css`
  margin: 0;
  padding: 0;
`;

const baseStyle = css`
  height: 100%;
  width: 100%;
  ${marPadZero};
`;

const createGlobalStyles = (theme: Theme) => css`
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Uchen&display=swap');
  html {
    background-color: ${theme.colors.background};
    ${baseStyle};
  }
  body {
    ${baseStyle};
    position: relative;
    box-sizing: border-box;
    font-family: ${theme.fontFamily.normal};
    color: ${theme.colors.text};
  }
  #app,
  #__next {
    ${baseStyle};
  }
  div,
  input,
  select,
  textarea,
  ul,
  li {
    box-sizing: border-box;
  }
  ul {
    list-style: none;
  }
  input,
  select,
  textarea {
    font-family: ${theme.fontFamily.normal};
    background-color: ${theme.colors.accentLight};
    color: ${theme.colors.text};
    border-radius: ${pxToRem(4)};
    border-width: ${theme.border.borderWidth[1]};
    :disabled {
      background-color: ${theme.colors.smudge};
    }
  }
  p,
  h1,
  h2,
  h3,
  pre,
  figure,
  ul,
  li {
    ${marPadZero};
  }
`;

const GlobalWrapper = styled(FlexBox)`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
`;

function Page({ Component, pageProps }: AppProps) {
  const [windowBreakpoints, setWindowBreakpoints] = useState<BreakpointSize[]>([
    'xxs',
  ]);
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  const theme = themes[colorMode];

  useEffect(() => {
    Object.keys(theme.breakpointValues).forEach((key, i, arr) => {
      const queryAdjective = key === 'xss' ? 'max' : 'min';
      const query = globalThis.matchMedia(
        `(${queryAdjective}-width: ${
          theme.breakpointValues[key as BreakpointSize]
        }px)`
      );
      if (query.matches) {
        setWindowBreakpoints(arr.slice(0, i + 1) as BreakpointSize[]);
      }
      query.addEventListener('change', (e) => {
        setWindowBreakpoints(
          arr.slice(0, e.matches ? i + 1 : i) as BreakpointSize[]
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeContextValue = useMemo(
    () => ({
      colorMode,
      setColorMode,
    }),
    [colorMode]
  );

  return (
    <UserProvider>
      <ThemeContext.Provider value={themeContextValue}>
        <ThemeProvider theme={theme}>
          <BreakpointsContext.Provider value={windowBreakpoints}>
            <NotificationsContextProvider>
              <GlobalWrapper>
                <Global styles={createGlobalStyles(theme)} />
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
              </GlobalWrapper>
            </NotificationsContextProvider>
          </BreakpointsContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </UserProvider>
  );
}

// eslint-disable-next-line import/no-default-export
export default Page;
