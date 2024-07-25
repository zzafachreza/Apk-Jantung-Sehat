import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyInput({
  onFocus,
  label,
  nolabel = false,
  borderColor = '#E7E8EE',
  backgroundColor = 'white',
  editable = true,
  icon = true,
  maxLength,
  iconname,
  onChangeText,
  value,
  borderWidth = 1,
  textColor = colors.black,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  autoFocus,
  multiline,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  placeholderTextColor = colors.border,
  unitText // Prop for the unit text
}) {
  const [tutup, setTutup] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {icon && !nolabel && (
          <Icon type="ionicon" name={iconname} color={colorIcon} size={MyDimensi / 4} />
        )}
        {!nolabel && (
          <Text style={[styles.label, styleLabel]}>
            {label}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          editable={editable}
          maxLength={maxLength}
          multiline={multiline}
          autoFocus={autoFocus}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry ? tutup : false}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          style={[
            styles.textInput,
            {
              borderColor: borderColor,
              color: textColor,
              borderWidth: borderWidth,
              backgroundColor: backgroundColor,
              ...styleInput,
            },
          ]}
        />
        {unitText && (
          <View style={styles.unitContainer}>
            <Text style={styles.unitText}>{unitText}</Text>
          </View>
        )}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setTutup(!tutup)}
            style={styles.eyeIcon}
          >
            <Icon type="ionicon" name={!tutup ? 'eye-off' : 'eye'} color={colors.border} size={18} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  label: {
    fontFamily: fonts.secondary[400],
    color: colors.primary,
    left: 0,
    fontSize: MyDimensi / 4,
  },
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: MyDimensi / 4,
    fontFamily: fonts.primary[400],
    height: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  unitContainer: {
    position: 'absolute',
    right: 40,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  unitText: {
    fontFamily: fonts.primary[400],
    color: colors.primary,
    fontSize: MyDimensi / 4,
  },
});
