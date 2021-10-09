import { useContext } from 'react';

import { BreakpointSize } from '~/typings/theme';

import { BreakpointsContext } from '../contexts/breakpointsContext';

export const useBreakpointsLessThan = (breakpoint: BreakpointSize) => {
  const breakpoints = useContext(BreakpointsContext);
  return !breakpoints.includes(breakpoint);
};

export const useBreakpointsAtLeast = (breakpoint: BreakpointSize) => {
  const breakpoints = useContext(BreakpointsContext);
  return breakpoints.includes(breakpoint);
};

export const useBreakpointsIsExactly = (breakpoint: BreakpointSize) => {
  const breakpoints = useContext(BreakpointsContext);
  return breakpoints[breakpoints.length - 1] === breakpoint;
};

export const useBreakpointsIsGreaterThan = (breakpoint: BreakpointSize) => {
  const breakpoints = useContext(BreakpointsContext);
  return (
    breakpoints.includes(breakpoint) &&
    breakpoints[breakpoints.length - 1] !== breakpoint
  );
};
