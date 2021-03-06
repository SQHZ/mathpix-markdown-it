import MathJaxPlugin from "./mdPluginRaw";
import mdPluginText from './mdPluginText';
import highlightPlugin from './mdHighlightCodePlugin';
import mdPluginTOC from './mdPluginTOC';
import mdPluginAnchor from './mdPluginAnchor';
import mdPluginSeparateForBlock from './mdPluginSeparateForBlock';
import mdPluginTableTabular from './mdPluginTableTabular';

/**
 * configured custom mathjax plugin
 */
export const ConfiguredMathJaxPlugin = MathJaxPlugin;

/**
 * configured custom tag plugin
 */
export const CustomTagPlugin = mdPluginText;

export const HighlightPlugin = highlightPlugin;

export const separateForBlockPlugin = mdPluginSeparateForBlock;
export const tocPlugin = mdPluginTOC;
export const anchorPlugin = mdPluginAnchor;
export const tableTabularPlugin = mdPluginTableTabular;
