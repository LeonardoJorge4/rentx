import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import { api } from '../../services/api';
import Logo from '../../assets/logo.svg';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
} from './styles';

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme()
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleNavigateCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />

          <TotalCars>
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>

      {
        isLoading
        ? <Load />
        : <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <Car
              data={item}
              onPress={() => handleNavigateCarDetails(item)}
            />
          }
        />
      }

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}