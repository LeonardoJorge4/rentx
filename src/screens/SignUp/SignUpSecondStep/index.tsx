import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { BackButton } from '../../../components/BackButton';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';
import theme from '../../../styles/theme';
import { api } from '../../../services/api';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const route = useRoute();
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      Alert.alert("Informe a senha e confirme");
    }

    if (password != passwordConfirm) {
      Alert.alert("As senhas não são iguais");
    }

    await api.post("/users", {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
    .then(() => {
      navigation.navigate("Confirmation", {
        title: "Conta Criada!",
        message: `Agora é só fazer login\ne aproveitar.`,
        nextScreenRoute: "SignIn"
      })
    })
    .catch(() => {
      Alert.alert("Opa", "Não foi possível cadastrar")
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{`\n`}
            conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{`\n`}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>
              2. Senha
            </FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            onPress={handleRegister}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}