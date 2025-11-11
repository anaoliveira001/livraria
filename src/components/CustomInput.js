import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

/**
 * Custom Input Component
 * Reusable text input with consistent styling
 */
const CustomInput = ({
  label,
  value,
  onChangeText,
  mode = 'outlined',
  error = false,
  errorText = '',
  disabled = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  placeholder,
  style,
  ...props
}) => {
  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode={mode}
        error={error}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        style={[styles.input, style]}
        {...props}
      />
      {error && errorText && (
        <TextInput.Error visible={error}>{errorText}</TextInput.Error>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
});

export default CustomInput;
