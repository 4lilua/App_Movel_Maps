import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import React, { useRef } from 'react';
import * as Location from 'expo-location';

export default function App() {

  const mapRef = useRef(null);
  const [region, setRegion] = useState({
      latitude: -21.374921735883014,
      longitude: -45.5108070824935,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
  });
  const [index, setIndex] = useState(0);
  const [localizacao, setLocalizacao] = useState(0);
  const [carrega, setCarrega] = useState(true);
  const [status, setStatus] = useState('');

  const rotas = [
    {
      id: 1,
      nome: 'Local que foi achado o ET de Varginha',
      descricao: '',
      latitude: -21.56766544016715,
      longitude: -45.43400453896689,
      cor: 'green',
    },
    
    {
      id: 2,
      nome: 'Muro do Caso ET de Varginha',
      descricao: '',
      latitude: -21.568176308046525,
      longitude: -45.43424669793189,
      cor: 'green',
    },
    {
      id: 3,
      nome: 'Avistamento do ET de Varginha',
      descricao: '',
      latitude: -21.564025562258795,
      longitude: -45.43441835930718,
      cor: 'green',
    },
    {
      id: 4,
      nome: 'LOCAL APARIÇÃO DO ET DE VARGINHA',
      descricao: '',
      latitude: -21.569253886077195,
      longitude: -45.4316717773026,
      cor: 'green',
    },
    {
      id: 5,
      nome: 'Memorial do ET',
      descricao: '',
      latitude: -21.53923603131077, 
      longitude: -45.437034091792334,
      cor: 'green',
    },
    {
      id: 6,
      nome: 'Nave Espacial de Varginha',
      descricao: '',
      latitude: -21.55930627625668,
      longitude: -45.43999730338807,
      cor: 'green',
    },
    {
      id: 7,
      nome: 'E.T. de Varginha',
      descricao: '',
      latitude: -21.559014037565408,
      longitude: -45.43996030327279,
      cor: 'pink',
    },
    {
      id: 8,
      nome: 'Ponto de ônibus ET',
      descricao: '',
      latitude: -21.566546331459534,
      longitude: -45.43692901202004,
      cor: 'blue',
    },
    {
      id: 9,
      nome: 'Aeroporto Regional de Varginha (VAG)',
      descricao: '',
      latitude: -21.58745124126899,
      longitude: -45.47609379260122,
      cor: 'white',
    },
    {
      id: 10,
      nome: 'Prefeitura Municipal de Varginha',
      descricao: '',
      latitude: -21.542714641095984,
      longitude: -45.444452669682306,
      cor: 'yellow',
    },
  ];

   
  useEffect(() => {
    mapRef.current.animateToRegion(region, 2000);
  }, [region])

    useEffect(() => {
      (async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== 'garanted'){
          alert("Permissão Negada!");
          setCarrega(false);
          return;
        }
        let useLocal = 
          await Location.getCurrentPositionAsync({});
        setLocalizacao(userLocal.coords);
        setCarrega(false);
      })
    mapRef.current.animateToRegion(region, 2000);
  }, [region])

  const irParaOutroLocal = () => {
    setRegion({
      latitude: rotas[index].latitude,
      longitude: rotas[index].longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setIndex(index+1);
    //mapRef.current.animateToRegion(region, 1000);
  }

  if(carrega || !localizacao){
    return(
      <View>
        <ActivityIndicator size='large' color='red'/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: -21.374921735883014,
          longitude: -45.5108070824935,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        ref={mapRef}
        showsUserLocation={true}
        mapType='standard'
      >
      {rotas.map((item) => (
         <Marker
           key={item.id}
           title={item.nome}
           description={item.descricao}
           coordinate={{ latitude: item.latitude, longitude: item.longitude }}
           pinColor={item.cor}
         />
      ))}
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
