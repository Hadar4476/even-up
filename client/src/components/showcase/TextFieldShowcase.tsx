import { Stack } from "@mui/material";

import AppTextField from "../common/inputs/AppTextField";

const TextFieldShowcase = () => {
  return (
    <Stack maxWidth="390px" gap="32px">
      <AppTextField type="text" label="Text Input" />
      <AppTextField type="password" label="Password" />
      <AppTextField type="email" label="Email" />
      <AppTextField type="number" label="Number" />
      <AppTextField type="tel" label="Telephone" />
      <AppTextField type="url" label="URL" />
      <AppTextField type="search" label="Search" />
    </Stack>
  );
};

export default TextFieldShowcase;
