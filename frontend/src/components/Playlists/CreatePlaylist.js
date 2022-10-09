import PlaylistForm from "./PlaylistForm";
import { useHistory } from 'react-router'
import { useParams } from "react-router";

const CreatePlaylistForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const playlist = {
    userId:'',
    id: {id},
    name:'',
    imageUrl:'',
    previewImage:''
  };

  return (
    <PlaylistForm closeForm={() => history.push('/playlists')} playlist={playlist} formType='Create' />
)}

export default CreatePlaylistForm;