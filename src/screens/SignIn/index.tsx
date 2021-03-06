import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import * as yup from 'yup';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';

import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Footer,
} from './styles';

export function SignIn() {
  const theme = useTheme();
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      const schema = yup.object().shape({
        email: yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
        password: yup.string()
        .required('Senha obrigatória')
      })
  
      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if(error instanceof yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        )
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep")
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <StatusBar
              translucent
              barStyle="dark-content"
              backgroundColor="transparent"
            />

            <Title>
              Estamos{`\n`}quase lá.
            </Title>

            <Subtitle>
              Faça seu login para começar{`\n`}
              uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}