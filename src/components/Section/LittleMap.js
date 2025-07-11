
import React from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const LittleMap = (props) => {
  return (
    <PlienMap>
      <GoogleMapReact
        apiKey="AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE"
        bootstrapURLKeys={{ key: "AIzaSyA8oEc5WKQqAXtSKpSH4igelH5wlPDaowE" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        KmlLayerStatus
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>

      {/* ------ ------ -------  */}
      
      {/* ---------------------- */}
    </PlienMap>
  );
};

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

export default LittleMap;

export const PlienMap = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  height: 50px;
  border-radius: 10px;
  border: transparent;
`;

const Calendar = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const InputCalendar = styled.input`
  padding: 5px;
  height: 50px;
  border-radius: 10px;
  border: transparent;
  color: #aaaaaa;
`;

const Card = styled.div`
  padding: 20px;
  background-color: #302f4a33;
  border: 1px solid #aaa;
  border-radius: 24.75px;
  z-index: 99999;
  position: absolute;
  gap: 20px;
  display: flex;
  flex-direction: column;
  top: 180px;
  left: 60px;
`;

const Dropdown = styled.select`
  height: 50px;
  border-radius: 10px;
  border: transparent;
  width: 75px;
`;

const SubmitButton = styled.button`
  height: 43.92px;
  border-radius: 10px;
  border: transparent;
  padding: 10px;
  margin-left: 10px;
  width: 325px;
  background-color: #d8b56c;
`;
