import { IGroup } from "@/types";
import React from "react";
import { useParams } from "react-router-dom";

const SingleGroup = () => {
  const { groupId } = useParams<{ groupId: IGroup["_id"] }>();

  console.log({ groupId });

  return <div>SingleGroup</div>;
};

export default SingleGroup;
