import { useQuery } from "@tanstack/react-query";
import postsService from "../services/posts";

const SomeComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getPosts,
  });

  console.log("from SomeComponent");

  console.log(data);
  console.log(isLoading);
  console.log(error);

  return <div>SomeComponent</div>;
};

export default SomeComponent;
