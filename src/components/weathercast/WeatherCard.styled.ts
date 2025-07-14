import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WeatherInfo = styled.div`
  flex: 1;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ForecastSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

export const ForecastItem = styled.div`
  flex: 1;
  min-width: 100px;
  text-align: center;
  padding: 10px;
  background: #e9ecef;
  border-radius: 5px;
`;

export const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

export const DetailCard = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const MapContainerStyled = styled.div`
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const StyledSelect = styled.select`
  padding: 8px 32px 8px 12px; /* Added padding for the arrow */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); /* Match container theme */
  color: #333; /* Ensure text is readable */
  cursor: pointer;
  appearance: none; /* Remove default arrow */
  position: relative;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    background: linear-gradient(135deg, #e0e6f0 0%, #b0c4e0 100%); /* Subtle hover effect */
  }

  /* Custom dropdown arrow */
  &::after {
    content: "▼";
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 12px;
    color: #007bff;
    pointer-events: none;
  }

  /* Style options to match */
  option {
    background: #fff;
    color: #333;
    padding: 5px;
  }
`;

export const WeatherItem = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;