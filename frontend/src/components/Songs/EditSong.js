import { useParams } from 'react-router-dom';
import SongForm from './SongForm';
import { useSelector } from 'react-redux';

const EditSongForm = () => {
  const { id } = useParams();

  const song = useSelector(state => state.songs[id]);

  return (
    <SongForm song={song} formType='Update' />
  )
}

export default EditSongForm;