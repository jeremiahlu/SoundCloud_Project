import AlbumForm from "./AlbumForm";
import { useHistory } from 'react-router'
import { useParams } from "react-router";

const CreateAlbumForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const album = {
    id: {id},
    userId:'',
    title:'',
    description:'',
    previewImage:''
  };

  return (
    <AlbumForm closeForm={() => history.push('/albums')} album={album} formType='Create' />
)}

export default CreateAlbumForm;