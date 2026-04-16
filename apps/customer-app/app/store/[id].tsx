import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const API_URL = 'http://localhost:8080/api';

export default function StoreScreen() {
  const { id } = useLocalSearchParams();
  const [merchant, setMerchant] = useState<any>(null);
  const [catalog, setCatalog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/merchants/${id}/catalog`)
      .then(res => res.json())
      .then(data => {
        setMerchant(data.merchant);
        setCatalog(data.catalog);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;
  if (!merchant) return <Text style={styles.error}>Store not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{merchant.name}</Text>
      <Text style={styles.subtext}>{merchant.description}</Text>

      <FlatList
        data={catalog}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.btnText}>+ Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  loader: { flex: 1, justifyContent: 'center' },
  error: { flex: 1, textAlign: 'center', marginTop: 40, fontSize: 16 },
  header: { fontSize: 28, fontWeight: 'bold', padding: 16, backgroundColor: '#fff' },
  subtext: { paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#fff', color: '#666' },
  list: { padding: 16 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, justifyContent: 'space-between', alignItems: 'center' },
  cardInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '600' },
  itemDesc: { fontSize: 14, color: '#888', marginTop: 4 },
  priceTag: { alignItems: 'flex-end', marginLeft: 16 },
  price: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  addBtn: { backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});
