# Z-Craft SCSS Guide: Usage of Variables, Mixins, Functions, and Utilities

This guide provides a detailed overview of how to use the SCSS components within Z-Craft. It includes examples in React TypeScript to demonstrate practical use cases for **variables**, **mixins**, **functions**, and **utility classes**. This guide will help you get started quickly and maintain consistency throughout your project.

## 1. Variables Usage

### Example: Button Component Using SCSS Variables

The SCSS variables defined in `_variables.scss` are used to provide a consistent color palette, spacing, and typographic style throughout the project.

#### `Button.module.scss`
```scss
@import '../styles/_variables.scss';

.button {
  background-color: $primary-color;
  color: #fff;
  padding: $button-padding;
  border-radius: $border-radius-hard;
  border: none;
  cursor: pointer;
  transition: background-color $transition-duration-fast $transition-timing-function;

  &:hover {
    background-color: darken($primary-color, 10%);
  }

  &:disabled {
    background-color: $disabled-color;
    cursor: not-allowed;
  }
}
```

#### `Button.tsx`
```tsx
import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
```

### Explanation
- **Background Color**: The `$primary-color` variable is used to maintain a consistent theme.
- **Padding and Radius**: `$button-padding` and `$border-radius-hard` are used to apply uniform spacing and rounded corners.
- **Hover and Disabled States**: Using `$disabled-color` ensures that button styles are consistent across different states.

## 2. Mixins Usage

### Example: Glassmorphic Card Component
The mixins in `_mixins.scss` help create reusable components with consistent styles.

#### `Card.module.scss`
```scss
@import '../styles/_mixins.scss';

.card {
  @include glass-effect;
  padding: $card-padding;
  border-radius: $border-radius-soft;
}
```

#### `Card.tsx`
```tsx
import React from 'react';
import styles from './Card.module.scss';

type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
```

### Explanation
- **Glass Effect**: The `@include glass-effect;` mixin applies the blurred background, transparency, and border that creates the glassmorphic effect.
- **Padding and Border Radius**: `$card-padding` and `$border-radius-soft` are used to provide consistent spacing and rounded edges.

## 3. Functions Usage

### Example: Calculating Responsive Font Sizes
Functions in `_functions.scss` can be used to create dynamic, responsive designs.

#### `Heading.module.scss`
```scss
@import '../styles/_functions.scss';
@import '../styles/_variables.scss';

.heading {
  font-size: responsive-font-size(16, 32);
  font-weight: $font-weight-bold;
  color: $text-color-primary;
}
```

#### `Heading.tsx`
```tsx
import React from 'react';
import styles from './Heading.module.scss';

type HeadingProps = {
  text: string;
};

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return <h1 className={styles.heading}>{text}</h1>;
};

export default Heading;
```

### Explanation
- **Responsive Font Size**: The `responsive-font-size(16, 32)` function generates a responsive CSS value that adapts between `16px` and `32px` depending on the viewport size.
- **Font Weight and Color**: Variables like `$font-weight-bold` and `$text-color-primary` are used for consistency in appearance.

## 4. Utilities Usage

### Example: Utility Classes for Layout
The utility classes in `_utilities.scss` are used for quick layout adjustments, ensuring consistency and reducing repetitive code.

#### `UserProfile.tsx`
```tsx
import React from 'react';
import styles from '../styles/_utilities.scss';

type UserProfileProps = {
  name: string;
  bio: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ name, bio }) => {
  return (
    <div className={`${styles.utility-flex-center} ${styles.utility-full-width}`}>
      <div className={styles.utility-border-radius-soft}>
        <h2 className={styles.utility-text-primary}>{name}</h2>
        <p className={styles.utility-text-secondary}>{bio}</p>
      </div>
    </div>
  );
};

export default UserProfile;
```

### Explanation
- **Center Alignment**: `utility-flex-center` is used to align the profile content both vertically and horizontally.
- **Full Width**: `utility-full-width` ensures that the profile container takes up the full width of its parent.
- **Border Radius**: `utility-border-radius-soft` gives the profile container smooth rounded corners.
- **Text Styling**: `utility-text-primary` and `utility-text-secondary` are used to style the name and bio with consistent colors.

## 5. Combining All Components
Here’s a practical example of using **variables**, **mixins**, **functions**, and **utilities** together in a React component:

#### `ProfileCard.module.scss`
```scss
@import '../styles/_variables.scss';
@import '../styles/_mixins.scss';
@import '../styles/_functions.scss';

.profile-card {
  @include glass-effect;
  padding: spacing(large);
  border-radius: border-radius(soft);
  box-shadow: box-shadow(light);
  color: $text-color-primary;
  transition: all $transition-duration-normal $transition-timing-function;

  &:hover {
    box-shadow: box-shadow(heavy);
  }
}
```

#### `ProfileCard.tsx`
```tsx
import React from 'react';
import styles from './ProfileCard.module.scss';

type ProfileCardProps = {
  name: string;
  role: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, role }) => {
  return (
    <div className={styles.profile-card}>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
};

export default ProfileCard;
```

### Explanation
- **Glassmorphic Effect**: The `glass-effect` mixin is used to give the card a modern and stylish glass appearance.
- **Padding and Border Radius**: `spacing(large)` and `border-radius(soft)` are used to apply consistent padding and rounded edges.
- **Box Shadow**: `box-shadow(light)` and `box-shadow(heavy)` provide depth effects on hover.

## Summary
This guide demonstrates how to effectively use the **variables**, **mixins**, **functions**, and **utilities** provided by Z-Craft to create a consistent, maintainable, and aesthetically pleasing design system. Using these SCSS components will enable you to:
- Maintain consistent theming and styling across the project.
- Reuse styles efficiently, reducing redundancy.
- Easily adapt the design to different contexts (e.g., responsive layouts).

Feel free to extend this guide as your project evolves to incorporate new components or design elements. If you need more details or further examples, don't hesitate to ask!

