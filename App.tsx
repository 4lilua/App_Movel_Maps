import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Pressable, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useRef } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const mapRef = useRef(null);
  
  const [region, setRegion] = useState({
    latitude: -21.5539,
    longitude: -45.4370,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  
  const [index, setIndex] = useState(0);
  const [localizacao, setLocalizacao] = useState(null);
  const [carrega, setCarrega] = useState(true);
  const [permissaoNegada, setPermissaoNegada] = useState(false);

  // Lista de 8 pontos da Rota do ET baseada no G1
  const rotas = [
    {
      id: 1,
      nome: 'Local onde o ET foi avistado',
      descricao: 'Local onde três jovens avistaram a criatura em 1996',
      latitude: -21.564025562258795,
      longitude: -45.43441835930718,
      cor: 'red',
    },
    {
      id: 2,
      nome: 'Muro do Caso ET de Varginha',
      descricao: 'Muro onde a criatura teria sido vista',
      latitude: -21.568176308046525,
      longitude: -45.43424669793189,
      cor: 'orange',
    },
    {
      id: 3,
      nome: 'Parque do Jardim Andere',
      descricao: 'Local onde o ET teria sido capturado',
      latitude: -21.569253886077195,
      longitude: -45.4316717773026,
      cor: 'purple',
    },
    {
      id: 4,
      nome: 'Memorial do ET',
      descricao: 'Memorial em homenagem ao caso',
      latitude: -21.53923603131077, 
      longitude: -45.437034091792334,
      cor: 'green',
    },
    {
      id: 5,
      nome: 'Nave Espacial - Caixa d\'água',
      descricao: 'Caixa d\'água decorada como nave espacial',
      latitude: -21.55930627625668,
      longitude: -45.43999730338807,
      cor: 'blue',
    },
    {
      id: 6,
      nome: 'Estátua do E.T.',
      descricao: 'Famosa estátua do ET na entrada da cidade',
      latitude: -21.559014037565408,
      longitude: -45.43996030327279,
      cor: 'pink',
    },
    {
      id: 7,
      nome: 'Ponto de ônibus temático',
      descricao: 'Ponto de ônibus decorado com tema do ET',
      latitude: -21.566546331459534,
      longitude: -45.43692901202004,
      cor: 'yellow',
    },
    {
      id: 8,
      nome: 'Prefeitura Municipal',
      descricao: 'Centro administrativo com referências ao caso',
      latitude: -21.542714641095984,
      longitude: -45.444452669682306,
      cor: 'aqua',
    },
  ];

  // useEffect para solicitar permissão e obter localização
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setPermissaoNegada(true);
          setCarrega(false);
          return;
        }
        
        let userLocal = await Location.getCurrentPositionAsync({});
        setLocalizacao(userLocal.coords);
        setCarrega(false);
      } catch (error) {
        console.error('Erro ao obter localização:', error);
        setPermissaoNegada(true);
        setCarrega(false);
      }
    })();
  }, []);

  // useEffect para animar mudança de região
  useEffect(() => {
    if (!carrega && mapRef.current) {
      mapRef.current.animateToRegion(region, 2000);
    }
  }, [region]);

  // Função para navegar pelos pontos da rota
  const irParaOutroLocal = () => {
    const proximoIndex = (index + 1) % rotas.length;
    
    setRegion({
      latitude: rotas[index].latitude,
      longitude: rotas[index].longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    
    setIndex(proximoIndex);
    
    // Verifica se completou a rota (estava no último ponto e vai voltar pro primeiro)
    if (index === rotas.length - 1) {
      Alert.alert(
        'Parabéns!',
        'Você completou toda a Rota do ET de Varginha! Visitou todos os ' + rotas.length + ' pontos turísticos.\n\nDeseja recomeçar o tour?',
        [
          {
            text: 'Não',
            style: 'cancel'
          },
          {
            text: 'Sim, recomeçar',
            onPress: () => {
              setIndex(0);
              setRegion({
                latitude: -21.5539,
                longitude: -45.4370,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              });
            }
          }
        ]
      );
    }
  };

  // Tela de carregamento
  if (carrega) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#4CAF50' />
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      </View>
    );
  }

  // Tela quando permissão é negada
  if (permissaoNegada) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapa}
          initialRegion={region}
          ref={mapRef}
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
        
        <View style={styles.infoContainer}>
          <Text style={styles.warningText}>
            Permissão de localização negada
          </Text>
          <Text style={styles.infoText}>
            O mapa está disponível, mas sua localização não será exibida.
          </Text>
          <Text style={styles.infoText}>
            Para ver sua localização, permita o acesso nas configurações.
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title={`Visitar: ${rotas[index].nome}`} 
            onPress={irParaOutroLocal}
            color="#4CAF50"
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

  // Tela principal com localização habilitada
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapa}
        initialRegion={region}
        ref={mapRef}
        showsUserLocation={true}
        showsMyLocationButton={true}
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
      
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>Rota do ET de Varginha</Text>
        <Text style={styles.infoText}>
          Explore {rotas.length} pontos turísticos da lendária Rota do ET
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title={`Visitar: ${rotas[index].nome}`} 
          onPress={irParaOutroLocal}
          color="#4CAF50"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4c3ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapa: {
    height: '75%',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#a5a4ffff',
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  warningText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 8,
  },
  buttonContainer: {
    padding: 10,
    width: '100%',
  },
});