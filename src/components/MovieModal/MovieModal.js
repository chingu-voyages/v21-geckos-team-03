/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

// Modal that pops up upon clicking a movie result for more info

function MovieModal() {
  const [modalOpen, setModalOpen] = useState(false);

  handleOpen = () => {
    setModalOpen(true);
  };
  handleClose = () => {
    setModalOpen(false);
  };

  return <div>{/* filter box, search bar, etc. */}</div>;
}

export default MovieModal;
