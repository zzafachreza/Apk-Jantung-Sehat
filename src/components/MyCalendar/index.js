import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

export default function MyCalendar({
  label,
  iconname,
  onDateChange,
  value,
  placeholder,
  iconColor = colors.primary,
  textColor = colors.primary,
  styleLabel,
}) {
  return (
    <>
      {label && (
        <View style={styles.labelContainer}>
          <Icon type="ionicon" name={iconname} color={iconColor} size={MyDimensi / 4} />
          <Text style={[styles.label, styleLabel]}>{label}</Text>
        </View>
      )}
      <View style={styles.calendarContainer}>
        <Text style={styles.dateText}>{value ? moment(value).format('DD MMMM YYYY') : placeholder}</Text>
        <DatePicker
          style={styles.datePicker}
          date={value}
          mode="date"
          placeholder={placeholder}
          
          showIcon={false}
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              fontFamily: fonts.secondary[400],
              fontSize: MyDimensi / 4,
              textAlign: 'left',
              alignItems: 'flex-start',
              opacity: 0,
              paddingLeft: 20,
              borderWidth: 0,
            },
          }}
          onDateChange={onDateChange}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    position: 'relative',
  },
  label: {
    fontFamily: fonts.secondary[400],
    color: colors.primary,
    left: 0,
    fontSize: 15,
  },
  calendarContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#E7E8EE',
    position: 'relative',
  },
  dateText: {
    position: 'absolute',
    zIndex: 0,
    top: 15,
    left: 20,
    fontFamily: fonts.secondary[600],
    fontSize: MyDimensi / 4,
    color: colors.primary,
  },
  datePicker: {
    width: '100%',
    height: 50,
  },
});
