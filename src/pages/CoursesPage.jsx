import React, { useEffect, useState } from 'react';
import { IconButton, Modal, Box, Typography, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from '../components/Container';
import { apiUrl, getData } from '../utils/utils';
import TopicCard from '../components/TopicCard';
import { useNavigate } from 'react-router-dom';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCourses() {
      const data = await getData(apiUrl.courses);
      setTopics(data);
    }
    getCourses();
  }, []);

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery)
  );

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleOpenModal = (topic) => {
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedTopic(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiUrl.courses}/${selectedTopic.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== selectedTopic.id));
        toast.success('Kurz bol úspešne odstránený.');
      } else {
        toast.error('Nepodarilo sa odstrániť kurz.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Chyba pri odstraňovaní kurzu.');
    } finally {
      handleCloseModal();
    }
  };

  const handleAddCourse = () => {
    navigate('/add-course'); // Redirect to the AddCourseForm page
  };

  return (
    <section className="page-courses">
      <Container>
        <div className="content-hold">
          <div className="header-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 className="page-title">Kurzy LoProConnect</h1>
              <p className="page-description">
                Vyhľadajte konkrétny kurz podľa kľúčových slov alebo si vyberte tému.
              </p>
            </div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Vyhľadajte kurz..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="topics-grid">
            {filteredTopics.map((topic) => (
              <div key={topic.id}>
                <TopicCard topic={topic} handleOpenModal={handleOpenModal} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Tooltip title="Pridať kurz">
              <IconButton
                color="primary"
                onClick={handleAddCourse}
              >
                <Add />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Container>

      <Modal
        open={!!selectedTopic}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Ste si istí, že chcete odstrániť kurz "{selectedTopic?.title}"?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <IconButton onClick={handleCloseModal} sx={{ mr: 1, width: 'auto' }}>
              Zrušiť
            </IconButton>
            <IconButton variant="contained" color="error" onClick={handleDelete} sx={{ width: 'auto' }}>
              Odstrániť
            </IconButton>
          </Box>
        </Box>
      </Modal>

      <ToastContainer />
    </section>
  );
}
