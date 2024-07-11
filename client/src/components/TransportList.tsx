import React from 'react';
import { type Starship, type Transport, type Vehicle } from '../interfaces';

const TransPortList = ({
  transportList,
}: {
  transportList: Vehicle[] | Starship[];
}) => (
  <ul className="list-disc ml-4 text-left">
    {transportList.map(transport => {
      const { name, model, cost_in_credits: cost }: Transport = transport;
      const starshipClass = (transport as Starship).starship_class;
      const vehicleClass = (transport as Vehicle).vechile_class;

      return (
        <li className="text-sm my-1" key={name}>
          Name: {name}{' '}
          <span className="text-sm">
            {cost !== 'unknown' ? `| Cost: ${cost}` : ''}
          </span>
          <p className="text-xs"> Model: {model} </p>
          <span className="text-xs">
            {starshipClass !== '' && `Starship Class - ${starshipClass}`}
            {vehicleClass !== '' && `Vehicle Class - ${vehicleClass}`}
          </span>
        </li>
      );
    })}
  </ul>
);

export default TransPortList;
