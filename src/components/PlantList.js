import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onToggleStock }) {
  return (
    <ul className="cards">
      {plants.map((plant, index) => (
        <PlantCard
          key={plant.id ? plant.id.toString() : `plant-${index}`}
          plant={plant}
          onToggleStock={onToggleStock}
        />
      ))}
    </ul>
  );
}

export default PlantList;