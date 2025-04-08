import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const RecordsScreen = () => {
  const records = [
    { id: '1', title: 'Blood Test', date: 'Apr 5, 2025', type: 'Lab' },
    { id: '2', title: 'X-Ray Scan', date: 'Mar 28, 2025', type: 'Imaging' },
    { id: '3', title: 'Doctor Note', date: 'Mar 15, 2025', type: 'Clinical' }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={records}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordTitle}>{item.title}</Text>
            <Text style={styles.recordMeta}>{item.type} • {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fa'
  },
  recordItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
  },
  recordMeta: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  }
});

export default RecordsScreen;