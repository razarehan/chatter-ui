import { Avatar, Button, Stack, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useGetMe } from "../../hooks/useGetMe";
import { snackVar } from "../../constants/snackbar";
import { API_URL } from "../../constants/urls";
import { commonFetch } from "../../utils/fetch";

const Profile = () => {
  const me = useGetMe();
  const handleFileUpload = async (event: any) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const res = await commonFetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData
      });
      if (!res.ok) {
        throw new Error("Image upload failed.");
      }
      snackVar({ message: "Image uploaded.", type: 'success' });
    } catch (err) {
      snackVar({ message: "Error uploading file.", type: "error" })
    }
  }
  return (
    <Stack
      spacing={6}
      sx={{
        marginTop: "2.5rem",
        alignItems: "center",
        justifyContent: "start"
      }}>
      <Typography variant="h3">{me?.data?.me.username}</Typography>
      <Avatar sx={{ width: 156, height: 156 }} src={me.data?.me.imageUrl}></Avatar>
      <Button component="label" variant="contained" size="small" startIcon={<UploadFile />}>
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
    </Stack>
  )
}
export default Profile;