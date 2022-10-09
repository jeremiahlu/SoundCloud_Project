import './albums.css';
import { useParams } from 'react-router-dom';
import AlbumForm from './AlbumForm';
import { useSelector } from 'react-redux';

const EditAlbumForm = () => {
  // const { id } = useParams();

  const album = useSelector(state => state.album);

  return (
    <AlbumForm album={album} formType='Update' />
  )
}

export default EditAlbumForm;