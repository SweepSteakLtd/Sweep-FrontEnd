# Tournament Theme Context

The Tournament Theme system allows screens within the tournament flow to use tournament-specific colors from the API. This creates a cohesive branded experience for each tournament.

## Overview

Tournament data from the API includes a `colours` object:

```typescript
{
  colours: {
    primary?: string;   // e.g., "#6b00ff" or "red"
    secondary?: string; // e.g., "#5317E8" or "blue"
    highlight?: string; // e.g., "#ACE817"
  }
}
```

The `TournamentThemeContext` makes these colors available to any screen within the tournament navigator.

## Usage

### 1. Import the hook

```typescript
import { useTournamentTheme } from '~/context/TournamentThemeContext';
```

### 2. Access tournament colors

```typescript
const { tournamentTheme } = useTournamentTheme();

// Available colors (with fallbacks to app theme)
tournamentTheme.primary   // Tournament primary color or app primary
tournamentTheme.secondary // Tournament secondary color or app secondary
tournamentTheme.highlight // Tournament highlight color or app primary
```

### 3. Apply to ScreenWrapper

```typescript
<ScreenWrapper
  title="Screen Title"
  headerBackgroundColor={tournamentTheme.primary}           // Navigation header
  contentBackgroundColor={hexWithOpacity(tournamentTheme.secondary, 0.1)} // Screen background
>
  {children}
</ScreenWrapper>
```

## Common Patterns

### Navigation Header (Primary Color)

The navigation bar should use the tournament's primary color:

```typescript
<ScreenWrapper
  title="League Home"
  headerBackgroundColor={tournamentTheme.primary}
>
```

### Content Background (Secondary Color with Transparency)

For a subtle themed background, use secondary color with low opacity:

```typescript
import { hexWithOpacity } from '~/utils/color';

<ScreenWrapper
  title="Leaderboard"
  headerBackgroundColor={tournamentTheme.primary}
  contentBackgroundColor={hexWithOpacity(tournamentTheme.secondary, 0.1)}
>
```

### Buttons (Secondary Variant)

Use `primaryColor` prop on Button components with `variant="secondary"`:

```typescript
<Button
  variant="secondary"
  title="Submit"
  primaryColor={tournamentTheme.primary}
/>
```

### Switch Component

Use `activeColor` prop:

```typescript
<Switch
  value={isEnabled}
  onValueChange={setIsEnabled}
  activeColor={tournamentTheme.primary}
/>
```

### RadioButton Component

Use `activeColor` prop:

```typescript
<RadioButton
  label="Option"
  selected={isSelected}
  onPress={handlePress}
  activeColor={tournamentTheme.primary}
/>
```

### TabBar Component

Use `activeColor` prop:

```typescript
<TabBar
  tabs={tabs}
  activeTab={activeTab}
  onTabPress={setActiveTab}
  activeColor={tournamentTheme.primary}
/>
```

### RefreshControl

Use primary color for the loading spinner:

```typescript
<RefreshControl
  refreshing={isRefetching}
  onRefresh={onRefresh}
  tintColor={tournamentTheme.primary}
/>
```

### Header Sections (Secondary with Transparency)

For content sections that need a themed background:

```typescript
// In styles.ts
import { hexWithOpacity } from '~/utils/color';

interface HeaderSectionProps {
  backgroundColor?: string;
}

export const HeaderSection = styled.View<HeaderSectionProps>`
  background-color: ${({ backgroundColor }: HeaderSectionProps) =>
    backgroundColor ? hexWithOpacity(backgroundColor, 0.2) : 'transparent'};
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

// In component
<HeaderSection backgroundColor={tournamentTheme.secondary}>
  <LeagueHeader ... />
</HeaderSection>
```

## Helper Utility

The `hexWithOpacity` utility converts colors to rgba with specified opacity:

```typescript
import { hexWithOpacity } from '~/utils/color';

// Supports hex colors
hexWithOpacity('#6b00ff', 0.2)  // "rgba(107, 0, 255, 0.2)"

// Supports named colors
hexWithOpacity('red', 0.1)      // "rgba(255, 0, 0, 0.1)"

// Supports 3-digit hex
hexWithOpacity('#f00', 0.5)     // "rgba(255, 0, 0, 0.5)"
```

## Screens Using Tournament Theme

| Screen | Header | Content BG | Buttons | Other |
|--------|--------|------------|---------|-------|
| TournamentLeagues | primary | secondary (0.2) | primary | Tabs, RefreshControl |
| LeagueHome | primary | secondary (0.2) | primary | - |
| CreateLeague | primary | - | primary | Switch |
| Leaderboard | primary | secondary (0.1) | - | RefreshControl |
| CreateTeam | primary | - | primary | - |

## Architecture

```
Dashboard (fetches tournaments with colours)
    │
    └─> TournamentNavigator
        │
        └─> TournamentThemeProvider (initialColors from route params)
            │
            ├─> TournamentLeagues
            ├─> LeagueHome
            ├─> CreateLeague
            ├─> Team/CreateTeam
            └─> Leaderboard

            All screens use useTournamentTheme() hook
```

## Fallback Behavior

If tournament colors are not available, the context falls back to the app's default theme colors:

```typescript
const tournamentTheme = useMemo(() => ({
  primary: colors?.primary || appTheme.colors.primary,
  secondary: colors?.secondary || appTheme.colors.secondary,
  highlight: colors?.highlight || appTheme.colors.primary,
}), [colors, appTheme]);
```

## Adding Tournament Theme to a New Screen

1. Import the hook:
   ```typescript
   import { useTournamentTheme } from '~/context/TournamentThemeContext';
   ```

2. Get theme in component:
   ```typescript
   const { tournamentTheme } = useTournamentTheme();
   ```

3. Apply to ScreenWrapper:
   ```typescript
   <ScreenWrapper
     title="New Screen"
     headerBackgroundColor={tournamentTheme.primary}
   >
   ```

4. Apply to interactive elements as needed (buttons, switches, etc.)
