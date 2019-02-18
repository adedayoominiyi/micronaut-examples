import {shape, string} from 'prop-types';
import React, {useEffect, useState} from 'react';
import config from '../config';
import PetsLayout from './PetsLayout';

async function loadPets(vendor, setPets) {
  const url = `${config.SERVER_URL}/pets/vendor/${vendor}`;
  try {
    const res = await fetch(url);
    const pets = await res.json();
    setPets(pets);
  } catch (e) {
    console.warn(e);
  }
}

function VendorPets({match}) {
  const [pets, setPets] = useState([]);

  const {vendor} = match.params;

  useEffect(() => {
    loadPets(vendor, setPets);
  }, []);

  return (
    <PetsLayout header={`Pets from ${vendor}`} match={match} pets={pets} />
  );
}

VendorPets.propTypes = {
  match: shape({
    params: shape({
      vendor: string
    })
  })
};

export default VendorPets;
