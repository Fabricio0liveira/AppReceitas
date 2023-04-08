import { View, Text, StyleSheet } from 'react-native';

export function Instructions({ data, index }) {
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{index+1}- </Text>
            <Text style={styles.text}>{data.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 14,
        paddingEnd: 14,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        width: '98%'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        lineHeight: 18,
    }
})