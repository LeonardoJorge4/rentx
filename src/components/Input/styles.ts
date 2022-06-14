import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/theme';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  width: 55px;
  height: 56px;
  align-items: center;
  justify-content: center;

  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocused, theme }) => 
    isFocused && css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `
  };
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: theme.colors.text
})<Props>`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  ${({ isFocused, theme }) => 
    isFocused && css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `
  };
`;