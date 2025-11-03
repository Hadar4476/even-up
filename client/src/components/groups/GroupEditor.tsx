import { useRef } from "react";
import useResponsive from "@/hooks/useResponsive";
import { useGroupEditor } from "./useGroupEditor";
import { useThemeContext } from "@/context/ThemeContext";

import { zIndex } from "@/common";

import { IGroup } from "@/types";

import AppModal from "../common/AppModal";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Add,
  Edit,
  ArrowBack,
  CameraAlt,
  CloudUpload,
  Delete,
  CheckCircle,
} from "@mui/icons-material";
import AppLoader from "../common/AppLoader";

interface GroupEditorProps {
  group?: IGroup;
}

const GroupEditor = ({ group }: GroupEditorProps) => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const { isMobile } = useResponsive();
  const {
    formik,
    isOpen,
    isLoading,
    isLoadingImage,
    isSuccess,
    imagePreview,
    handleOpen,
    handleClose,
    handleImageChange,
    handleImageRemove,
  } = useGroupEditor(group);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  let buttonText = "";

  if (!isMobile) {
    buttonText = group ? "Edit Group" : "New Group";
  }

  let content = (
    <>
      <Box
        className="flex flex-row p-6 relative items-center justify-center md:justify-start md:px-8"
        sx={{
          ...(isMobile && {
            backgroundColor: theme.palette.background.paper,
          }),
          ...(!isDarkMode && {
            borderBottom: "1px solid",
            borderColor: theme.palette.border?.default,
          }),
        }}
      >
        {isMobile && (
          <Button
            className="!absolute left-0 !w-[40px] !h-[40px] !p-0 md:!px-4 !rounded-full"
            variant="text"
            onClick={handleClose}
          >
            <ArrowBack sx={{ color: theme.palette.text.primary }} />
          </Button>
        )}
        <Typography variant={isMobile ? "b_20" : "b_24"} color="textPrimary">
          {group ? "Edit Group" : "Create Group"}
        </Typography>
      </Box>

      <form
        className="w-full flex-1 flex flex-col gap-6 p-6 md:p-8"
        // style={{
        //   backgroundColor: theme.palette.background.default,
        // }}
        onSubmit={formik.handleSubmit}
      >
        <Stack className="gap-4">
          <Typography variant="regular_16">Group Image</Typography>

          {imagePreview ? (
            <>
              <Box className="w-full h-[160px] rounded-md overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={imagePreview}
                  alt="Group preview"
                />
              </Box>
              <Box className="flex flex-row gap-6">
                <Button
                  className="flex-1"
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  Change Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </Button>
                <Button
                  className="flex-1"
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleImageRemove}
                >
                  Remove
                </Button>
              </Box>
            </>
          ) : (
            <Box
              className="h-[160px] flex flex-col items-center justify-center gap-2 cursor-pointer rounded-md"
              sx={{
                border: "2px dashed",
                borderColor: "border.default",
                transition: "all 0.2s",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "action.hover",
                },
              }}
              onClick={handleBrowseClick}
            >
              {isLoadingImage ? (
                <div>loading...</div>
              ) : (
                <>
                  <Box
                    className="w-[48px] h-[48px] flex items-center justify-center rounded-full"
                    sx={{
                      backgroundColor: "action.hover",
                    }}
                  >
                    <CameraAlt />
                  </Box>

                  <Typography variant="b_16" color="text.secondary">
                    Tap to upload image
                  </Typography>

                  <Typography variant="regular_12" color="text.disabled">
                    PNG, JPG up to 5MB
                  </Typography>

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </>
              )}
            </Box>
          )}
        </Stack>

        <TextField
          label="Title"
          name="title"
          fullWidth
          required
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
        />

        <TextField
          label="Description"
          name="description"
          fullWidth
          required
          multiline
          rows={isMobile ? 3 : 4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
        />

        <Button
          size="large"
          sx={{ height: "56px" }}
          fullWidth
          type="submit"
          disabled={isLoading}
        >
          Confirm
        </Button>
      </form>
    </>
  );

  if (isSuccess) {
    content = (
      <Box
        className="w-full h-full flex flex-col flex-1 md:items-center md:justify-center"
        sx={{
          zIndex: zIndex.primary,
          backgroundColor: theme.palette.background.default,
        }}
      >
        {isMobile && (
          <Button
            className="!absolute top-4 left-0 !w-[40px] !h-[40px] p-2 md:!px-4 !rounded-full"
            variant="text"
            onClick={handleClose}
            disabled={isLoading}
          >
            <ArrowBack sx={{ color: theme.palette.text.primary }} />
          </Button>
        )}
        <Box className="w-full h-full flex flex-col items-center justify-center">
          <>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="b_38" color="success">
                Success
              </Typography>
              <CheckCircle color="success" fontSize="large" />
            </Box>
            <Typography variant="md_22">
              {group ? "Changes have been saved!" : "Group created!"}
            </Typography>
          </>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {isLoading && <AppLoader />}
      <Box className="flex items-end justify-end">
        <Button
          className="!w-[40px] !p-0 md:!w-fit md:flex md:gap-1 md:!px-4 !rounded-full"
          disableRipple={!isMobile}
          size="medium"
          onClick={handleOpen}
        >
          {group ? (
            <Edit className="md:!text-lg" />
          ) : (
            <Add className="md:!text-lg" />
          )}
          {buttonText}
        </Button>
      </Box>
      <AppModal
        className="w-full h-full !overflow-y-auto !rounded-none md:max-w-xl md:h-auto md:min-h-96 md:!rounded-xl"
        isOpen={isOpen}
        emitClose={handleClose}
      >
        {content}
      </AppModal>
    </>
  );
};

export default GroupEditor;
