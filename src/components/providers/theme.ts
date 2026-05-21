import type { ThemeConfig } from 'antd';

const INK = '#003162';
const MUTED = '#4A6A8A';
const LINE = '#C8D4E0';
const BG = '#F0F4F8';
const CTA = '#CD0000';

const theme: ThemeConfig = {
  token: {
    fontFamily: "var(--font-body, 'Roboto', sans-serif)",
    colorPrimary: INK,
    colorError: '#c0392b',
    borderRadius: 0,
    lineWidth: 1,
    colorBorder: LINE,
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorPrimaryBg: BG,
    colorPrimaryBgHover: '#D8E0E8',
    colorPrimaryBorder: INK,
    colorPrimaryBorderHover: '#00224a',
    colorPrimaryHover: '#00224a',
    colorPrimaryActive: '#001830',
    colorFill: BG,
    colorFillSecondary: BG,
    colorFillTertiary: BG,
    colorFillQuaternary: BG,
    colorFillContent: BG,
    colorFillContentHover: '#D8E0E8',
    controlItemBgHover: BG,
    controlItemBgActive: '#D8E0E8',
    controlItemBgActiveHover: LINE,
    controlOutline: 'transparent',
    controlOutlineWidth: 0,
    controlHeight: 32,
    fontSize: 14,
  },
  components: {
    Button: {
      colorPrimary: CTA,
      colorPrimaryHover: '#B80000',
      colorPrimaryActive: '#A00000',
      defaultColor: INK,
      defaultBorderColor: INK,
      defaultHoverBg: BG,
      fontWeight: 600,
      paddingInline: 32,
      paddingBlock: 14,
    },
    Input: {
      activeBorderColor: INK,
      hoverBorderColor: MUTED,
      activeShadow: 'none',
      paddingBlock: 6,
      paddingInline: 12,
      fontSize: 14,
    controlHeight: 32,
    },
    Select: {
      optionSelectedBg: BG,
      controlHeight: 36,
    },
    Form: {
      itemMarginBottom: 24,
      labelFontSize: 15,
      labelColor: MUTED,
      labelRequiredMarkColor: INK,
    },
    Result: {
      titleFontSize: 28,
    },
  },
};

export default theme;
