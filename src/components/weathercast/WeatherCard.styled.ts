import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const WeatherInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WeatherDetails = styled.div`
  margin-top: 20px;
`;

export const MapContainerStyled = styled.div`
  flex: 1;
  height: 300px;
  min-width: 300px;

  @media (max-width: 768px) {
    height: 200px;
    min-width: auto;
  }
`;