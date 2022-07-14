import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';

import DoneSvg from '../../assets/done.svg';
import LogoSvg from '../../assets/logo_background_gray.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const route = useRoute();
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  const { title, message, nextScreenRoute } = route.params as Params;

  function handleConfirm() {
    navigate(nextScreenRoute)
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>
          {message}
        </Message>

      </Content>

      <Footer>
        <ConfirmButton
          title="OK"
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
}