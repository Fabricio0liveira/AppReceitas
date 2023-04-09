import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { FoodList } from '../../components/foodList';
import api from '../../services/api'

export function Search() {
    const route = useRoute();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchRecipes() {
            const response = await api.get(`/foods?name_like=${route.params?.name}`);

            setRecipes(response.data);
        }

        fetchRecipes();

    }, [route.params?.name]);

    return (
        <View style={styles.container}>
            <FlatList 
                data={recipes}
                keyExtractor={ (item) => String(item.id) }
                showsVerticalScrollIndicator={false}
                renderItem={ ({ item }) => <FoodList data={ item } /> }
                ListEmptyComponent={ () => 
                    <Text style={styles.text}>
                        Não foi encontrado...
                    </Text> 
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f9ff',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 14
    },
    text: {
        fontSize: 16,
        marginTop: 14
    }
});