import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // Ajuste o caminho se necessário
import { act } from 'react'; // Atualização da importação

test('renders learn react link', () => {
  act(() => {
    render(<App />);
  });
  
  const linkElement = screen.getByText(/Calcular Custo/i);
  expect(linkElement).toBeInTheDocument();
});
