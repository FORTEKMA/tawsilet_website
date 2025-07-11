import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import i18n from '../../../i18n';

const CarSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 5px;
`;

const CarTypesContainer = styled.div`
  display: flex;
  overflow-x: auto; /* Enable horizontal scrolling */
  gap: 20px; /* Adjusted gap between cards */
  padding: 10px;
  height: 100%; /* Allow content to dictate height */
  align-items: center;
  justify-content: space-between; /* Align items to the start */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d8b56c;
    border-radius: 3px;
  }

  @media (max-width: 600px) {
    flex-direction: row;
    overflow-x: unset;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
  }
`;

const ComingSoonTag = styled.div`
  display: inline-block;
  margin-bottom: 6px;
  background: #ffd966;
  color: #555;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 3px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.07);
  pointer-events: none;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarTypeCard = styled.div`
  flex: 0 0 auto;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-top: ${props => props.soon ? '38px' : '10px'};
  border: 2px solid ${props => props.selected ? '#000' : '#e0e0e0'};
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  background-color: #fff;
  box-shadow: ${props => props.selected ? '0px 0px 15px rgba(0, 0, 0, 0.2)' : 'none'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  position: relative;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-5px) scale(1.02)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 4px 8px rgba(0,0,0,0.1)'};
  }

  img {
    width: 100px;
    height: 60px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  @media (max-width: 600px) {
    width: 32%;
    min-width: 0;
    height: 100px;
    padding: 6px;
    padding-top: ${props => props.soon ? '28px' : '6px'};
    img {
      width: 50px;
      height: 28px;
      margin-bottom: 4px;
    }
  }
`;

const CarTitle = styled.h3`
  font-size: 1.1rem; /* Adjusted font size */
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

const CarDescription = styled.p`
  font-size: 0.8rem; /* Adjusted font size */
  color: #888; /* Lighter color for description */
  text-align: center;
  margin: 5px 0 0 0; /* Adjusted margin */

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const CarCapacity = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem; /* Adjusted font size */
  color: #888;
  margin-top: 5px; /* Adjusted margin */

  svg {
    margin-right: 5px; /* Adjusted margin */
    font-size: 0.7rem; /* Adjusted icon size */
  }

  @media (max-width: 600px) {
    font-size: 0.6rem;
    svg {
      font-size: 0.6rem;
    }
  }
`;

// Helper to get localized name (fallback to vehicle.name or vehicle.label)
function getLocalizedName(vehicle) {
  const lang = i18n.language || 'fr';
  if (lang.startsWith('ar')) return vehicle.name_ar || vehicle.label || vehicle.name || 'Véhicule';
  if (lang.startsWith('fr')) return vehicle.name_fr || vehicle.label || vehicle.name || 'Véhicule';
  if (lang.startsWith('en')) return vehicle.name_en || vehicle.label || vehicle.name || 'Véhicule';
  return vehicle.label || vehicle.name || 'Véhicule';
}

const CarSelection = ({ selectedCar, onSelectCar }) => {
  const [carTypes, setCarTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/settings?populate[0]=icon`);
        if (response?.data?.data && Array.isArray(response.data.data)) {
          const visibleVehicles = response.data.data.filter(vehicle => vehicle.show !== false);
          const processedOptions = visibleVehicles.map(vehicle => ({
            id: vehicle.id,
            title: getLocalizedName(vehicle),
            capacity: vehicle.places_numbers || 4,
            image: vehicle.icon?.url || null,
            soon: vehicle.soon || false,
            reservation_price: vehicle.reservation_price
          }));
          const sortedOptions = processedOptions.sort((a, b) => a.id - b.id);
          setCarTypes(sortedOptions);
        } else {
          setCarTypes([]);
        }
      } catch (err) {
        setError('Erreur lors du chargement des types de véhicules.');
        setCarTypes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCarTypes();
  }, []);

  if (loading) return <CarSelectionContainer>Chargement des types de véhicules...</CarSelectionContainer>;
  if (error) return <CarSelectionContainer>{error}</CarSelectionContainer>;

  return (
    <CarSelectionContainer>
      <CarTypesContainer>
        {carTypes.map((car) => (
          <CardWrapper key={car.id}>
            {car.soon && <ComingSoonTag>Coming Soon</ComingSoonTag>}
            <CarTypeCard
              selected={selectedCar === car.id}
              onClick={() => !car.soon && onSelectCar(car)}
              disabled={car.soon}
              soon={car.soon}
            >
              {car.image ? (
                <img src={car.image} alt={car.title} />
              ) : (
                <FontAwesomeIcon icon={faCar} style={{ fontSize: 48, marginBottom: 10 }} />
              )}
              <CarTitle>{car.title}</CarTitle>
              <CarCapacity>
                <FontAwesomeIcon icon={faCar} /> {car.capacity} personnes
              </CarCapacity>
            </CarTypeCard>
          </CardWrapper>
        ))}
      </CarTypesContainer>
    </CarSelectionContainer>
  );
};

export default CarSelection; 