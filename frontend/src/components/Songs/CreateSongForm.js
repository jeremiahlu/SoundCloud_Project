import SongForm from "./SongForm";
import { useHistory } from 'react-router'

const CreateSongForm = () => {
  const history = useHistory();
  const song = {
    id:'',
    title:'',
    description:'some description',
    url:'',
    imageUrl:'',
    albumId:'',
  };

  return (
    <SongForm closeForm={() => history.push('/songs')} song={song} formType='Create' />
)}

export default CreateSongForm;