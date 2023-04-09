import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { FoodList } from '../../components/foodList';

import { getFavorites } from '../../utils/storage'; 

export function Favorites() {
    const [recipes, setRecipes] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        let isActive = true;

        async function getRecipes() {
            const result = await getFavorites('@appReceitas');
            
            if(isActive) {
                setRecipes(result);
            }   
        }

        if(isActive) {
            getRecipes();
        }

        // Quando sair da tela de favoritos ele desativa esta verificação
        return () => {
            isActive = false;
        }

    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Receitas Favoritas</Text>

            {recipes.length === 0 && (
                <Text style={{ marginTop: 14, fontSize: 16 }}>Você ainda não tem nenhuma receita salva.</Text>
            )}

            <FlatList 
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 14 }}
                data={recipes}
                keyExtractor={ (item) => String(item.id) }
                renderItem={ ({ item }) => <FoodList data={ item } /> }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f9ff',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 36
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24
    }
});