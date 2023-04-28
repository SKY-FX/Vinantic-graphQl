import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOTTLES } from "../graphql/bottleQueries";

const Vinantic = () => {
  const { loading, error, data } = useQuery(GET_BOTTLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="grid grid-cols-4 gap-4 m-10">
      {data.getBottles.map((bottle) => (
        <div key={bottle.id} className="border mb-5 text-center">
          <p className="font-bold">{bottle.name}</p>
          <p>{bottle.price} €</p>
          <p>{bottle.year}</p>
          <p>{bottle.ref}</p>
        </div>
      ))}
    </div>
  );
};

export default Vinantic;
