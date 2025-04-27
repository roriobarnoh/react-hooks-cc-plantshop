import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) =>
        setPlants(
          data.map((plant) => ({
            ...plant,
            inStock: true,
            id: plant.id || Math.random().toString(36).substr(2, 9),
          }))
        )
      )
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const handleAddPlant = (newPlant) => {
    const plantToSend = {
      name: newPlant.name,
      image: newPlant.image,
      price: newPlant.price.toString(),
    };
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(plantToSend),
    })
      .then((res) => res.json())
      .then((data) =>
        setPlants([
          ...plants,
          {
            ...data,
            inStock: true,
            id: data.id || Math.random().toString(36).substr(2, 9),
          },
        ])
      )
      .catch((error) => console.error("Error adding plant:", error));
  };

  const handleToggleStock = (id) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
      )
    );
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} setSearch={setSearch} />
      <PlantList plants={filteredPlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;