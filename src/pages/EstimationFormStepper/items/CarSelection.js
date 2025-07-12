import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

const CarSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CarTypesContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: visible;
  gap:10px;
`;

const ComingSoonTag = styled.div`
  display: inline-block;
  margin-bottom: 6px;
  background: #ffd966;
  color: #555;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.07);
  pointer-events: none;
  white-space: nowrap;
        width: fit-content;
        align-self: center;
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 2px 10px;
    margin-bottom: 4px;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 2px 8px;
    margin-bottom: 3px;
  }

  @media (max-width: 360px) {
    font-size: 0.7rem;
    padding: 1px 6px;
    margin-bottom: 2px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  flex:1
`;

const CarTypeCard = styled.div`
  flex: 1;
  min-width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-top: ${props => props.soon ? '32px' : '10px'};
  border: 2px solid ${props => props.selected ? '#000' : '#e0e0e0'};
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  background-color: #fff;
  box-shadow: ${props => props.selected ? '0px 0px 15px rgba(0, 0, 0, 0.2)' : 'none'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  position: relative;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  margin: 2px;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-3px) scale(1.02)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 4px 8px rgba(0,0,0,0.1)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px) scale(1.01)'};
  }

  img {
    width: 80px;
    height: 48px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  /* Tablet */
  @media (max-width: 768px) {
    min-width: 120px;
    height: 130px;
    padding: 8px;
    padding-top: ${props => props.soon ? '28px' : '8px'};

    img {
      width: 70px;
      height: 42px;
      margin-bottom: 8px;
    }
  }

  /* Mobile landscape */
  @media (max-width: 600px) {
    min-width: 100px;
    height: 120px;
    padding: 6px;
    padding-top: ${props => props.soon ? '24px' : '6px'};

    img {
      width: 60px;
      height: 36px;
      margin-bottom: 6px;
    }
  }

  /* Mobile portrait */
  @media (max-width: 480px) {
    min-width: 90px;
    height: 110px;
    padding: 5px;
    padding-top: ${props => props.soon ? '20px' : '5px'};

    img {
      width: 50px;
      height: 30px;
      margin-bottom: 5px;
    }
  }

  /* Very small screens */
  @media (max-width: 360px) {
    min-width: 80px;
    height: 100px;
    padding: 4px;
    padding-top: ${props => props.soon ? '18px' : '4px'};

    img {
      width: 45px;
      height: 27px;
      margin-bottom: 4px;
    }
  }
`;

const CarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`;

const CarDescription = styled.p`
  font-size: 0.8rem;
  color: #888;
  text-align: center;
  margin: 5px 0 0 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin: 4px 0 0 0;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    margin: 3px 0 0 0;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    margin: 2px 0 0 0;
  }

  @media (max-width: 360px) {
    font-size: 0.6rem;
    margin: 2px 0 0 0;
  }
`;

const CarCapacity = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
  margin-top: 6px;
  line-height: 1.2;

  svg {
    margin-right: 5px;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-top: 5px;
    svg {
      font-size: 0.75rem;
      margin-right: 4px;
    }
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
    margin-top: 4px;
    svg {
      font-size: 0.7rem;
      margin-right: 3px;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    margin-top: 3px;
    svg {
      font-size: 0.65rem;
      margin-right: 3px;
    }
  }

  @media (max-width: 360px) {
    font-size: 0.6rem;
    margin-top: 2px;
    svg {
      font-size: 0.6rem;
      margin-right: 2px;
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
  const { t } = useTranslation();
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
        setError(t('Step3.carSelection.error'));
        setCarTypes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCarTypes();
  }, []);

  if (loading) return (
    <CarSelectionContainer>
      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        fontSize: '1rem',
        color: '#666'
      }}>
        {t('Step3.carSelection.loading')}
      </div>
    </CarSelectionContainer>
  );
  if (error) return (
    <CarSelectionContainer>
      <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        fontSize: '1rem',
        color: '#e74c3c'
      }}>
        {error}
      </div>
    </CarSelectionContainer>
  );

  return (
    <CarSelectionContainer>
      <CarTypesContainer>
        {carTypes.map((car) => (
          <CardWrapper key={car.id}>
            {car.soon && <ComingSoonTag>{t('Step3.carSelection.comingSoon')}</ComingSoonTag>}
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
                <FontAwesomeIcon icon={faCar} /> {car.capacity} {t('Step3.carSelection.people')}
              </CarCapacity>
            </CarTypeCard>
          </CardWrapper>
        ))}
      </CarTypesContainer>
    </CarSelectionContainer>
  );
};

export default CarSelection; 