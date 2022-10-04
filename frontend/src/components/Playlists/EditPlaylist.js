import { useParams } from 'react-router-dom';
import PlaylistForm from './PlaylistForm';
import { useSelector } from 'react-redux';

const EditPlaylistForm = () => {
  // const { id } = useParams();

  const playlist = useSelector(state => state.playlist);

  return (
    <PlaylistForm playlist={playlist} formType='Update' />
  )
}

export default EditPlaylistForm;