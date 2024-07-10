import { StyleSheet, Text, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import React from 'react';
import { MyDimensi, colors, fonts } from '../../utils';

export default function MyRadio({ label, description, selected, onPress, showInput, onInputChange }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
                    {selected && <View style={styles.radioButtonInner} />}
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{label}</Text>
                    {selected && description ? <Text style={styles.description}>{description}</Text> : null}
                    {selected && showInput ? (
                        <TextInput
                            style={styles.input}
                            placeholder="Tambah Jenis Penyakit Jantung"
                            placeholderTextColor="gray"
                            onChangeText={onInputChange}
                        />
                    ) : null}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioButtonSelected: {
        borderColor: colors.primary,
    },
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    label: {
        fontSize: 15,
        fontFamily: fonts.secondary[600],
        color: colors.primary,
    },
    description: {
        fontSize: 14,
        fontFamily: fonts.secondary[400],
        color: colors.primary,
        marginTop: 5,
        textAlign:"justify"
    },
    input: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 12,
        fontSize: 12,
        fontFamily: fonts.secondary[400],
        color: colors.primary,
    },
});
