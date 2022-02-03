import { useContext } from 'react';
import styled from '@emotion/styled/macro';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import ThemeToggle from './ThemeToggle';
import ThemeProvider, { ThemeContext } from './themeContext';
import ToDoListPage from './ToDoListPage';
import ToDoItemPage from './ToDoItemPage';

const Container = styled.div`
  position: relative;
  width: 600px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background: ${({ theme }) => theme.primaryColor};
`;

const ThemedApp = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Container theme={theme}>
      <Header text="TODO LIST" />
      <ThemeToggle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDoListPage />} />
          <Route path="/item/:itemId" element={<ToDoItemPage />} />
          <Route
            path="*"
            element={
              <main>
                <p>404</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default ThemedApp;
