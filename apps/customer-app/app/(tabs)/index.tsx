import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

// In a real app we fetch this URL from environment variables, e.g. process.env.EXPO_PUBLIC_API_URL
const API_URL = 'http://localhost:8080/api';

export default function HomeScreen() {
  const [merchants, setMerchants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_URL}/merchants`)
      .then(res => res.json())
      .then(data => {
        if (data.merchants) setMerchants(data.merchants);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Stores</Text>
      <FlatList
        data={merchants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push(`/store/${item.id}`)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f4f8' },
  loader: { flex: 1, justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  name: { fontSize: 18, fontWeight: '600' },
  description: { fontSize: 14, color: '#666', marginTop: 4 }
});
