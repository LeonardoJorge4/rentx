import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { BackButton } from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValueContainer,
  DateValue,
  Content,
  Footer,
} from './styles';

export function Scheduling() {
  const theme = useTheme();
  const { navigate } = useNavigation();

  function handleConfirmRental() {
    navigate("SchedulingDetails");
  }

  return (
    <Container>
      <Header>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />

        <BackButton
          onPress={() => { }}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma{`\n`}
          data de início e{`\n`}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>
              DE
            </DateTitle>
            <DateValueContainer selected={false}>
              <DateValue>
                18/06/2022
              </DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>
              ATÉ
            </DateTitle>

            <DateValueContainer selected={false}>
              <DateValue>
                27/06/2022
              </DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}