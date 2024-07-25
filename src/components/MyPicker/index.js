import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';

export default function MyPicker({
  label,
  iconname,
  onValueChange,
  value,
  placeholder,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <>
      {label && (
        <View style={styles.labelContainer}>
          {/* <Icon type="ionicon" name={iconname} color={colorIcon} size={MyDimensi / 4} /> */}
          <Text style={[styles.label, styleLabel]}>{label}</Text>
        </View>
      )}
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={onValueChange}
        >
          <Picker.Item label={placeholder} value="" color={colors.placeholder} />
          {data.map(item => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              color={colors.text}
            />
          ))}
        </Picker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
  },
  label: {
    fontFamily: fonts.secondary[400],
    color: colors.primary,
    // left: 10,
    fontSize: MyDimensi / 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    borderColor: '#E7E8EE',
    backgroundColor: 'white',
  },
  picker: {
    height: 48,
  },
});
