// Re-export colors from theme for backward compatibility
// TODO: Remove this file once all components use useTheme hook
import { theme } from './theme';

export const colors = theme.colors;
