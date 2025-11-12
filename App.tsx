import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import React, { useRef } from 'react';

export default function App() {

  const mapRef = useRef(null);

  const estadios = [
    {
      id: 1,
      nome: 'Local que foi achado o ET de Varginha',
      descricao: '',
      latitude: -21.56766544016715,
      longitude: -45.43400453896689,
      cor: 'blue',
    },
    {
      id: 2,
      nome: 'Memorial do ET',
      descricao: 'Arena Independência - Estádio Raimundo Sampaio',
      latitude: -21.53923603131077, 
      longitude: -45.437034091792334,
      cor: 'green',
    },
    {
      id: 3,
      nome: 'Nave Espacial de Varginha',
      descricao: 'Campo comunitário',
      latitude: -21.55885257042439,
      longitude: -45.43622993450117,
      cor: 'red',
    },
    {
      id: 4,
      nome: 'E.T. de Varginha',
      descricao: 'Campo comunitário',
      latitude: -21.559014037565408,
      longitude: -45.43996030327279,
      cor: 'red',
    },
    {
      id: 5,
      nome: 'Ponto de ônibus ET',
      descricao: 'Campo comunitário',
      latitude: -21.566546331459534,
      longitude: -45.43692901202004,
      cor: 'red',
    },
    {
      id: 6,
      nome: 'Aeroporto Regional de Varginha (VAG)',
      descricao: 'Campo comunitário',
      latitude: -21.58745124126899,
      longitude: -45.47609379260122,
      cor: 'red',
    },
  ];
 
   
  useEffect(() => {
    mapRef.current.animateToRegion(region, 2000);
  }, [region])

  const irParaOutroLocal = () => {
    setRegion({
      latitude: -21.374921735883014,
      longitude: -45.5108070824935,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    })
    //mapRef.current.animateToRegion(region, 1000);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapa}
        initialRegion={region}
        ref={mapRef}
        showsUserLocation={true}
        mapType='standard'
      >
        <Marker
          coordinate={{ latitude: -21.5556, longitude: -45.4364 }}
          title="Varginha - MG"
          description="Cidade do ET e do café!"
        />
      </MapView>
      <Text>Usando mapas no React Native</Text>
      <Button title="Mudar local" onPress={irParaOutroLocal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapa: {
    height: '80%',
    width: '100%',
  }
});
