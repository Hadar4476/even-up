// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login, register } from "@/services/auth";

// export const useLoginApi = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["auth"] });
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//     mutationFn: login,
//   });
// };

// export const useRegisterApi = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["auth"] });
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//     mutationFn: register,
//   });
// };
