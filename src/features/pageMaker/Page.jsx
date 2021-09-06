import React from "react";
import { useParams } from "react-router-dom";
export default function Page() {
  let { id } = useParams();
  return <div>Recipe : {id}</div>;
}
