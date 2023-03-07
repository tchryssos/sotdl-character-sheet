import styled from '@emotion/styled';

import { pxToRem } from '~/logic/utils/styles/pxToRem';

import { AsciiSize } from '../ascii/types';
import { Icon } from './Icon';

interface LogoProps {
  className?: string;
  size?: AsciiSize;
}

const LogoIcon = styled(Icon)<Pick<LogoProps, 'size'>>(({ theme, size }) => {
  let width = 160;

  switch (size) {
    case 'sm':
      width = 60;
      break;
    case 'md':
    default:
      break;
  }

  return {
    width: pxToRem(width),
    height: pxToRem(width),
    text: {
      fontFamily: theme.fontFamily.normal,
      fontSize: theme.fontSize[14],
      color: theme.colors.text,
    },
    line: {
      stroke: theme.colors.text,
      strokeLinecap: 'round',
      strokeLineJoin: 'mitter',
      strokeWidth: '1',
    },
    '*': {
      stroke: theme.colors.text,
      fill: theme.colors.text,
      color: theme.colors.text,
    },
  };
});

// Thank you https://ivanceras.github.io/elm-examples/elm-bot-lines/
export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <LogoIcon
      className={className}
      size={size}
      title="rpg sheet logo"
      viewBox="0 0 362 450"
    >
      <defs>
        <marker
          id="triangle"
          markerHeight="10"
          markerUnits="strokeWidth"
          markerWidth="10"
          orient="auto"
          refX="0"
          refY="5"
          viewBox="0 0 14 14"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <text x="390" y="12">
        .
      </text>
      <text x="398" y="12">
        *
      </text>
      <text x="406" y="12">
        ,
      </text>
      <text x="382" y="28">
        .
      </text>
      <text x="390" y="28">
        .
      </text>
      <text x="398" y="28">
        ,
      </text>
      <text x="406" y="28">
        .
      </text>
      <text x="414" y="28">
        .
      </text>
      <text x="422" y="28">
        .
      </text>
      <text x="430" y="28">
        ,
      </text>
      <line x1="384" x2="392" y1="48" y2="32" />
      <text x="390" y="44">
        (
      </text>
      <text x="398" y="44">
        *
      </text>
      <text x="414" y="44">
        .
      </text>
      <text x="430" y="44">
        *
      </text>
      <text x="342" y="60">
        %
      </text>
      <text x="350" y="60">
        &amp;
      </text>
      <text x="358" y="60">
        @
      </text>
      <text x="366" y="60">
        @
      </text>
      <text x="374" y="60">
        .
      </text>
      <text x="382" y="60">
        .
      </text>
      <line x1="392" x2="400" y1="64" y2="48" />
      <text x="406" y="60">
        .
      </text>
      <text x="414" y="60">
        ,
      </text>
      <text x="310" y="76">
        %
      </text>
      <text x="318" y="76">
        &amp;
      </text>
      <text x="326" y="76">
        &amp;
      </text>
      <text x="334" y="76">
        %
      </text>
      <text x="342" y="76">
        #
      </text>
      <text x="350" y="76">
        #
      </text>
      <text x="358" y="76">
        #
      </text>
      <text x="366" y="76">
        %
      </text>
      <text x="374" y="76">
        %
      </text>
      <text x="382" y="76">
        .
      </text>
      <text x="390" y="76">
        .
      </text>
      <text x="398" y="76">
        .
      </text>
      <text x="414" y="76">
        *
      </text>
      <text x="310" y="92">
        %
      </text>
      <text x="318" y="92">
        (
      </text>
      <text x="326" y="92">
        (
      </text>
      <text x="334" y="92">
        (
      </text>
      <text x="342" y="92">
        (
      </text>
      <text x="350" y="92">
        (
      </text>
      <text x="358" y="92">
        (
      </text>
      <text x="366" y="92">
        #
      </text>
      <text x="374" y="92">
        %
      </text>
      <text x="382" y="92">
        %
      </text>
      <text x="390" y="92">
        .
      </text>
      <text x="398" y="92">
        .
      </text>
      <text x="318" y="108">
        .
      </text>
      <text x="326" y="108">
        (
      </text>
      <text x="334" y="108">
        (
      </text>
      <text x="342" y="108">
        (
      </text>
      <text x="350" y="108">
        #
      </text>
      <text x="358" y="108">
        %
      </text>
      <text x="366" y="108">
        (
      </text>
      <text x="374" y="108">
        (
      </text>
      <text x="382" y="108">
        #
      </text>
      <text x="390" y="108">
        %
      </text>
      <text x="398" y="108">
        .
      </text>
      <text x="406" y="108">
        *
      </text>
      <text x="334" y="124">
        (
      </text>
      <text x="342" y="124">
        &amp;
      </text>
      <text x="350" y="124">
        &amp;
      </text>
      <text x="358" y="124">
        &amp;
      </text>
      <text x="366" y="124">
        (
      </text>
      <line x1="376" x2="384" y1="128" y2="112" />
      <text x="382" y="124">
        (
      </text>
      <text x="390" y="124">
        (
      </text>
      <text x="398" y="124">
        %
      </text>
      <text x="406" y="124">
        .
      </text>
      <text x="414" y="124">
        *
      </text>
      <text x="326" y="140">
        &amp;
      </text>
      <text x="334" y="140">
        &amp;
      </text>
      <text x="342" y="140">
        &amp;
      </text>
      <text x="350" y="140">
        &amp;
      </text>
      <text x="358" y="140">
        &amp;
      </text>
      <text x="366" y="140">
        #
      </text>
      <text x="374" y="140">
        #
      </text>
      <text x="382" y="140">
        ,
      </text>
      <text x="390" y="140">
        (
      </text>
      <text x="398" y="140">
        (
      </text>
      <text x="406" y="140">
        #
      </text>
      <text x="414" y="140">
        .
      </text>
      <text x="422" y="140">
        *
      </text>
      <text x="310" y="156">
        &amp;
      </text>
      <text x="318" y="156">
        &amp;
      </text>
      <text x="326" y="156">
        &amp;
      </text>
      <text x="334" y="156">
        &amp;
      </text>
      <text x="342" y="156">
        &amp;
      </text>
      <text x="350" y="156">
        #
      </text>
      <line x1="360" x2="368" y1="160" y2="144" />
      <line x1="368" x2="376" y1="160" y2="144" />
      <line x1="376" x2="384" y1="160" y2="144" />
      <text x="382" y="156">
        .
      </text>
      <text x="390" y="156">
        *
      </text>
      <line x1="400" x2="408" y1="160" y2="144" />
      <line x1="408" x2="416" y1="160" y2="144" />
      <text x="414" y="156">
        (
      </text>
      <text x="422" y="156">
        ,
      </text>
      <text x="430" y="156">
        *
      </text>
      <text x="286" y="172">
        &amp;
      </text>
      <text x="294" y="172">
        &amp;
      </text>
      <text x="302" y="172">
        &amp;
      </text>
      <text x="310" y="172">
        &amp;
      </text>
      <text x="318" y="172">
        &amp;
      </text>
      <text x="326" y="172">
        &amp;
      </text>
      <text x="334" y="172">
        &amp;
      </text>
      <line x1="344" x2="352" y1="176" y2="160" />
      <line x1="352" x2="360" y1="176" y2="160" />
      <line x1="360" x2="368" y1="176" y2="160" />
      <line x1="368" x2="376" y1="176" y2="160" />
      <text x="374" y="172">
        .
      </text>
      <text x="382" y="172">
        .
      </text>
      <text x="390" y="172">
        ,
      </text>
      <line x1="400" x2="408" y1="176" y2="160" />
      <line x1="408" x2="416" y1="176" y2="160" />
      <text x="414" y="172">
        *
      </text>
      <text x="422" y="172">
        *
      </text>
      <text x="22" y="188">
        *
      </text>
      <text x="30" y="188">
        #
      </text>
      <text x="262" y="188">
        &amp;
      </text>
      <text x="270" y="188">
        &amp;
      </text>
      <text x="278" y="188">
        &amp;
      </text>
      <text x="286" y="188">
        &amp;
      </text>
      <text x="294" y="188">
        &amp;
      </text>
      <text x="302" y="188">
        &amp;
      </text>
      <text x="310" y="188">
        &amp;
      </text>
      <text x="318" y="188">
        &amp;
      </text>
      <text x="326" y="188">
        &amp;
      </text>
      <line x1="336" x2="344" y1="192" y2="176" />
      <line x1="344" x2="352" y1="192" y2="176" />
      <line x1="352" x2="360" y1="192" y2="176" />
      <line x1="360" x2="368" y1="192" y2="176" />
      <text x="366" y="188">
        .
      </text>
      <text x="374" y="188">
        .
      </text>
      <text x="382" y="188">
        *
      </text>
      <text x="30" y="204">
        (
      </text>
      <text x="38" y="204">
        %
      </text>
      <text x="46" y="204">
        &amp;
      </text>
      <text x="222" y="204">
        .
      </text>
      <text x="230" y="204">
        &amp;
      </text>
      <text x="238" y="204">
        &amp;
      </text>
      <text x="246" y="204">
        &amp;
      </text>
      <text x="254" y="204">
        &amp;
      </text>
      <text x="262" y="204">
        &amp;
      </text>
      <text x="270" y="204">
        &amp;
      </text>
      <text x="278" y="204">
        &amp;
      </text>
      <text x="286" y="204">
        &amp;
      </text>
      <text x="294" y="204">
        &amp;
      </text>
      <text x="302" y="204">
        &amp;
      </text>
      <text x="310" y="204">
        &amp;
      </text>
      <text x="318" y="204">
        &amp;
      </text>
      <text x="326" y="204">
        *
      </text>
      <line x1="336" x2="344" y1="208" y2="192" />
      <line x1="344" x2="352" y1="208" y2="192" />
      <line x1="352" x2="360" y1="208" y2="192" />
      <text x="30" y="220">
        (
      </text>
      <text x="38" y="220">
        (
      </text>
      <text x="46" y="220">
        %
      </text>
      <text x="54" y="220">
        &amp;
      </text>
      <text x="62" y="220">
        &amp;
      </text>
      <text x="70" y="220">
        &amp;
      </text>
      <text x="78" y="220">
        .
      </text>
      <line x1="184" x2="192" y1="224" y2="208" />
      <text x="190" y="220">
        &amp;
      </text>
      <text x="198" y="220">
        &amp;
      </text>
      <text x="206" y="220">
        &amp;
      </text>
      <text x="214" y="220">
        &amp;
      </text>
      <text x="222" y="220">
        &amp;
      </text>
      <text x="230" y="220">
        &amp;
      </text>
      <text x="238" y="220">
        &amp;
      </text>
      <text x="246" y="220">
        &amp;
      </text>
      <text x="254" y="220">
        &amp;
      </text>
      <text x="262" y="220">
        &amp;
      </text>
      <text x="270" y="220">
        &amp;
      </text>
      <text x="278" y="220">
        &amp;
      </text>
      <text x="286" y="220">
        &amp;
      </text>
      <text x="294" y="220">
        &amp;
      </text>
      <text x="302" y="220">
        &amp;
      </text>
      <text x="310" y="220">
        #
      </text>
      <line x1="320" x2="328" y1="224" y2="208" />
      <line x1="328" x2="336" y1="224" y2="208" />
      <line x1="336" x2="344" y1="224" y2="208" />
      <line x1="344" x2="352" y1="224" y2="208" />
      <text x="38" y="236">
        (
      </text>
      <text x="46" y="236">
        (
      </text>
      <text x="54" y="236">
        #
      </text>
      <text x="62" y="236">
        &amp;
      </text>
      <text x="70" y="236">
        &amp;
      </text>
      <text x="78" y="236">
        &amp;
      </text>
      <text x="86" y="236">
        &amp;
      </text>
      <text x="94" y="236">
        &amp;
      </text>
      <text x="102" y="236">
        &amp;
      </text>
      <text x="110" y="236">
        &amp;
      </text>
      <text x="118" y="236">
        &amp;
      </text>
      <text x="126" y="236">
        &amp;
      </text>
      <text x="134" y="236">
        &amp;
      </text>
      <text x="142" y="236">
        %
      </text>
      <text x="150" y="236">
        %
      </text>
      <text x="158" y="236">
        %
      </text>
      <text x="166" y="236">
        %
      </text>
      <text x="174" y="236">
        %
      </text>
      <text x="182" y="236">
        &amp;
      </text>
      <text x="190" y="236">
        &amp;
      </text>
      <text x="198" y="236">
        &amp;
      </text>
      <text x="206" y="236">
        &amp;
      </text>
      <text x="214" y="236">
        &amp;
      </text>
      <text x="222" y="236">
        &amp;
      </text>
      <text x="230" y="236">
        &amp;
      </text>
      <text x="238" y="236">
        &amp;
      </text>
      <text x="246" y="236">
        &amp;
      </text>
      <text x="254" y="236">
        &amp;
      </text>
      <text x="262" y="236">
        &amp;
      </text>
      <text x="270" y="236">
        &amp;
      </text>
      <text x="278" y="236">
        &amp;
      </text>
      <text x="286" y="236">
        &amp;
      </text>
      <text x="294" y="236">
        &amp;
      </text>
      <line x1="304" x2="312" y1="240" y2="224" />
      <line x1="312" x2="320" y1="240" y2="224" />
      <line x1="320" x2="328" y1="240" y2="224" />
      <line x1="328" x2="336" y1="240" y2="224" />
      <line x1="336" x2="344" y1="240" y2="224" />
      <text x="46" y="252">
        (
      </text>
      <text x="54" y="252">
        (
      </text>
      <text x="62" y="252">
        (
      </text>
      <text x="70" y="252">
        (
      </text>
      <text x="78" y="252">
        &amp;
      </text>
      <text x="86" y="252">
        &amp;
      </text>
      <text x="94" y="252">
        &amp;
      </text>
      <text x="102" y="252">
        &amp;
      </text>
      <text x="110" y="252">
        &amp;
      </text>
      <text x="118" y="252">
        &amp;
      </text>
      <text x="126" y="252">
        &amp;
      </text>
      <text x="134" y="252">
        &amp;
      </text>
      <text x="142" y="252">
        &amp;
      </text>
      <text x="150" y="252">
        &amp;
      </text>
      <text x="158" y="252">
        &amp;
      </text>
      <text x="166" y="252">
        &amp;
      </text>
      <text x="174" y="252">
        &amp;
      </text>
      <text x="182" y="252">
        &amp;
      </text>
      <text x="190" y="252">
        &amp;
      </text>
      <text x="198" y="252">
        &amp;
      </text>
      <text x="206" y="252">
        &amp;
      </text>
      <text x="214" y="252">
        &amp;
      </text>
      <text x="222" y="252">
        &amp;
      </text>
      <text x="230" y="252">
        &amp;
      </text>
      <text x="238" y="252">
        &amp;
      </text>
      <text x="246" y="252">
        &amp;
      </text>
      <text x="254" y="252">
        &amp;
      </text>
      <text x="262" y="252">
        &amp;
      </text>
      <text x="270" y="252">
        @
      </text>
      <text x="278" y="252">
        %
      </text>
      <line x1="288" x2="296" y1="256" y2="240" />
      <line x1="296" x2="304" y1="256" y2="240" />
      <line x1="304" x2="312" y1="256" y2="240" />
      <text x="310" y="252">
        *
      </text>
      <text x="318" y="252">
        *
      </text>
      <text x="326" y="252">
        *
      </text>
      <text x="54" y="268">
        (
      </text>
      <text x="62" y="268">
        (
      </text>
      <text x="70" y="268">
        (
      </text>
      <text x="78" y="268">
        (
      </text>
      <text x="86" y="268">
        (
      </text>
      <text x="94" y="268">
        &amp;
      </text>
      <text x="102" y="268">
        &amp;
      </text>
      <text x="110" y="268">
        &amp;
      </text>
      <text x="118" y="268">
        &amp;
      </text>
      <text x="126" y="268">
        @
      </text>
      <text x="134" y="268">
        @
      </text>
      <text x="142" y="268">
        @
      </text>
      <text x="150" y="268">
        &amp;
      </text>
      <text x="158" y="268">
        &amp;
      </text>
      <text x="166" y="268">
        &amp;
      </text>
      <text x="174" y="268">
        &amp;
      </text>
      <text x="182" y="268">
        @
      </text>
      <text x="190" y="268">
        @
      </text>
      <text x="198" y="268">
        @
      </text>
      <text x="206" y="268">
        @
      </text>
      <text x="214" y="268">
        @
      </text>
      <text x="222" y="268">
        @
      </text>
      <text x="230" y="268">
        @
      </text>
      <text x="238" y="268">
        @
      </text>
      <text x="246" y="268">
        @
      </text>
      <text x="254" y="268">
        @
      </text>
      <text x="262" y="268">
        %
      </text>
      <line x1="272" x2="280" y1="272" y2="256" />
      <line x1="280" x2="288" y1="272" y2="256" />
      <text x="286" y="268">
        *
      </text>
      <line x1="296" x2="304" y1="272" y2="256" />
      <line x1="304" x2="312" y1="272" y2="256" />
      <line x1="312" x2="320" y1="272" y2="256" />
      <text x="318" y="268">
        *
      </text>
      <text x="62" y="284">
        .
      </text>
      <text x="70" y="284">
        (
      </text>
      <text x="78" y="284">
        (
      </text>
      <text x="86" y="284">
        (
      </text>
      <text x="94" y="284">
        (
      </text>
      <text x="102" y="284">
        (
      </text>
      <text x="110" y="284">
        #
      </text>
      <text x="118" y="284">
        %
      </text>
      <text x="126" y="284">
        &amp;
      </text>
      <text x="134" y="284">
        @
      </text>
      <text x="142" y="284">
        @
      </text>
      <text x="150" y="284">
        @
      </text>
      <text x="158" y="284">
        @
      </text>
      <text x="166" y="284">
        @
      </text>
      <text x="174" y="284">
        @
      </text>
      <text x="182" y="284">
        @
      </text>
      <text x="190" y="284">
        @
      </text>
      <text x="198" y="284">
        @
      </text>
      <text x="206" y="284">
        @
      </text>
      <text x="214" y="284">
        @
      </text>
      <text x="222" y="284">
        @
      </text>
      <text x="230" y="284">
        @
      </text>
      <text x="238" y="284">
        %
      </text>
      <text x="246" y="284">
        (
      </text>
      <line x1="256" x2="264" y1="288" y2="272" />
      <line x1="264" x2="272" y1="288" y2="272" />
      <line x1="272" x2="280" y1="288" y2="272" />
      <line x1="280" x2="288" y1="288" y2="272" />
      <line x1="288" x2="296" y1="288" y2="272" />
      <line x1="296" x2="304" y1="288" y2="272" />
      <line x1="304" x2="312" y1="288" y2="272" />
      <line x1="312" x2="320" y1="288" y2="272" />
      <text x="318" y="284">
        .
      </text>
      <text x="78" y="300">
        (
      </text>
      <text x="86" y="300">
        (
      </text>
      <text x="94" y="300">
        (
      </text>
      <text x="102" y="300">
        (
      </text>
      <text x="110" y="300">
        (
      </text>
      <text x="118" y="300">
        (
      </text>
      <text x="126" y="300">
        (
      </text>
      <text x="134" y="300">
        (
      </text>
      <text x="142" y="300">
        (
      </text>
      <text x="150" y="300">
        (
      </text>
      <text x="158" y="300">
        (
      </text>
      <text x="166" y="300">
        (
      </text>
      <text x="174" y="300">
        (
      </text>
      <text x="182" y="300">
        (
      </text>
      <text x="190" y="300">
        (
      </text>
      <text x="198" y="300">
        (
      </text>
      <text x="206" y="300">
        (
      </text>
      <text x="214" y="300">
        (
      </text>
      <line x1="224" x2="232" y1="304" y2="288" />
      <line x1="232" x2="240" y1="304" y2="288" />
      <line x1="240" x2="248" y1="304" y2="288" />
      <line x1="248" x2="256" y1="304" y2="288" />
      <line x1="256" x2="264" y1="304" y2="288" />
      <line x1="264" x2="272" y1="304" y2="288" />
      <line x1="272" x2="280" y1="304" y2="288" />
      <line x1="280" x2="288" y1="304" y2="288" />
      <line x1="288" x2="296" y1="304" y2="288" />
      <line x1="296" x2="304" y1="304" y2="288" />
      <line x1="304" x2="312" y1="304" y2="288" />
      <text x="94" y="316">
        (
      </text>
      <line x1="104" x2="112" y1="320" y2="304" />
      <line x1="112" x2="120" y1="320" y2="304" />
      <line x1="120" x2="128" y1="320" y2="304" />
      <line x1="128" x2="136" y1="320" y2="304" />
      <line x1="136" x2="144" y1="320" y2="304" />
      <line x1="144" x2="152" y1="320" y2="304" />
      <line x1="152" x2="160" y1="320" y2="304" />
      <line x1="160" x2="168" y1="320" y2="304" />
      <line x1="168" x2="176" y1="320" y2="304" />
      <line x1="176" x2="184" y1="320" y2="304" />
      <line x1="184" x2="192" y1="320" y2="304" />
      <line x1="192" x2="200" y1="320" y2="304" />
      <line x1="200" x2="208" y1="320" y2="304" />
      <line x1="208" x2="216" y1="320" y2="304" />
      <line x1="216" x2="224" y1="320" y2="304" />
      <line x1="224" x2="232" y1="320" y2="304" />
      <line x1="232" x2="240" y1="320" y2="304" />
      <line x1="240" x2="248" y1="320" y2="304" />
      <line x1="248" x2="256" y1="320" y2="304" />
      <line x1="256" x2="264" y1="320" y2="304" />
      <line x1="264" x2="272" y1="320" y2="304" />
      <line x1="272" x2="280" y1="320" y2="304" />
      <line x1="280" x2="288" y1="320" y2="304" />
      <line x1="288" x2="296" y1="320" y2="304" />
      <line x1="120" x2="128" y1="336" y2="320" />
      <line x1="128" x2="136" y1="336" y2="320" />
      <line x1="136" x2="144" y1="336" y2="320" />
      <line x1="144" x2="152" y1="336" y2="320" />
      <line x1="152" x2="160" y1="336" y2="320" />
      <line x1="160" x2="168" y1="336" y2="320" />
      <line x1="168" x2="176" y1="336" y2="320" />
      <line x1="176" x2="184" y1="336" y2="320" />
      <line x1="184" x2="192" y1="336" y2="320" />
      <line x1="192" x2="200" y1="336" y2="320" />
      <line x1="200" x2="208" y1="336" y2="320" />
      <line x1="208" x2="216" y1="336" y2="320" />
      <line x1="216" x2="224" y1="336" y2="320" />
      <line x1="224" x2="232" y1="336" y2="320" />
      <line x1="232" x2="240" y1="336" y2="320" />
      <line x1="240" x2="248" y1="336" y2="320" />
      <line x1="248" x2="256" y1="336" y2="320" />
      <line x1="256" x2="264" y1="336" y2="320" />
      <line x1="264" x2="272" y1="336" y2="320" />
      <text x="150" y="348">
        ,
      </text>
      <line x1="160" x2="168" y1="352" y2="336" />
      <line x1="168" x2="176" y1="352" y2="336" />
      <line x1="176" x2="184" y1="352" y2="336" />
      <line x1="184" x2="192" y1="352" y2="336" />
      <line x1="192" x2="200" y1="352" y2="336" />
      <line x1="200" x2="208" y1="352" y2="336" />
      <line x1="208" x2="216" y1="352" y2="336" />
      <line x1="216" x2="224" y1="352" y2="336" />
      <line x1="224" x2="232" y1="352" y2="336" />
      <line x1="232" x2="240" y1="352" y2="336" />
    </LogoIcon>
  );
}
