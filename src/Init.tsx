import React from 'react';
import Container from 'components/Container';
import SelectCountry from 'screens/SelectCountry';
import Loader from 'components/Loader';
import {useApp} from 'contexts/app';
import Navigator from './Navigator';

const Init: React.FC = () => {
  const {hydrated, country} = useApp();

  if (!hydrated) {
    return (
      <Container>
        <Loader fullscreen />
      </Container>
    );
  }

  if (!country) {
    return <SelectCountry />;
  }

  return (
    <Container>
      <Navigator />
    </Container>
  );
};

export default Init;
