import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

/**
 * Custom Button Component
 * Reusable button with consistent styling
 */
const CustomButton = ({
  children,
  mode = 'contained',
  onPress,
  loading = false,
  disabled = false,
  icon,
  style,
  ...props
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      icon={icon}
      style={[styles.button, style]}
      {...props}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
  },
});

export default CustomButton;
